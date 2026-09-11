using Microsoft.EntityFrameworkCore;
using PortfolioAPI.Models;
using Azure.Communication.Email;
using System.Threading.RateLimiting;
using Microsoft.AspNetCore.RateLimiting;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

builder.Services.AddDbContext<PortfolioDbContext>(options =>
    options.UseSqlServer(
        builder.Configuration.GetConnectionString("DefaultConnection"),
        sqlOptions => sqlOptions
            .EnableRetryOnFailure(
                maxRetryCount: 5,
                maxRetryDelay: TimeSpan.FromSeconds(30),
                errorNumbersToAdd: null)));

// ACS email client, built from the connection string in App Service configuration
// (Acs__EmailConnectionString). Only registered when configured — if it's missing,
// EmailClient is simply never added to the container, and ContactController's
// nullable constructor parameter receives null instead of the app failing to build.
// This keeps a missing email setting from taking down the entire API (projects, etc.).
var acsConnectionString = builder.Configuration["Acs:EmailConnectionString"];
if (!string.IsNullOrWhiteSpace(acsConnectionString))
{
    builder.Services.AddSingleton(new EmailClient(acsConnectionString));
}

const string FrontendCorsPolicy = "AllowFrontend";
builder.Services.AddCors(options =>
{
    options.AddPolicy(FrontendCorsPolicy, policy =>
    {
        policy.WithOrigins(
                "https://zealous-grass-0486b4710.3.azurestaticapps.net",
                "https://dgarstecki-dev.com",
                "https://www.dgarstecki-dev.com",
                "http://localhost:5173"
            )
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

// Rate limiting — partitioned per client IP, so one visitor spamming requests
// doesn't get to run up ACS email costs or hammer the database repeatedly.
// Built into ASP.NET Core since .NET 7, no extra package needed.
builder.Services.AddRateLimiter(options =>
{
    options.RejectionStatusCode = StatusCodes.Status429TooManyRequests;

    // Contact form: emails cost money to send and there's no legitimate reason
    // for one visitor to submit repeatedly, so this is intentionally strict.
    options.AddPolicy("contact", httpContext =>
        RateLimitPartition.GetFixedWindowLimiter(
            partitionKey: httpContext.Connection.RemoteIpAddress?.ToString() ?? "unknown",
            factory: _ => new FixedWindowRateLimiterOptions
            {
                PermitLimit = 5,
                Window = TimeSpan.FromMinutes(10),
                QueueLimit = 0
            }));

    // Projects listing: a plain read, but still worth capping so a scraper/bot
    // hammering it in a loop can't generate unbounded load.
    options.AddPolicy("projects", httpContext =>
        RateLimitPartition.GetFixedWindowLimiter(
            partitionKey: httpContext.Connection.RemoteIpAddress?.ToString() ?? "unknown",
            factory: _ => new FixedWindowRateLimiterOptions
            {
                PermitLimit = 30,
                Window = TimeSpan.FromMinutes(1),
                QueueLimit = 0
            }));

    // Friendly JSON body instead of an empty 429, so the frontend can show a real message.
    options.OnRejected = async (context, cancellationToken) =>
    {
        context.HttpContext.Response.ContentType = "application/json";
        await context.HttpContext.Response.WriteAsync(
            "{\"errors\":[\"Too many requests. Please wait a bit and try again.\"]}",
            cancellationToken);
    };
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.UseCors(FrontendCorsPolicy);

app.UseRateLimiter();

app.UseAuthorization();

app.MapControllers();

app.Run();