using Microsoft.EntityFrameworkCore;
using PortfolioAPI.Models;
using Azure.Communication.Email;

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
// (Acs__EmailConnectionString) — never from a committed file.
var acsConnectionString = builder.Configuration["Acs:EmailConnectionString"]
    ?? throw new InvalidOperationException("Acs:EmailConnectionString is not configured.");
builder.Services.AddSingleton(new EmailClient(acsConnectionString));

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

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.UseCors(FrontendCorsPolicy);

app.UseAuthorization();

app.MapControllers();

app.Run();