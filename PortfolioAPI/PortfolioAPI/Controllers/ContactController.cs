using Microsoft.AspNetCore.Mvc;
using System.Text.RegularExpressions;
using Azure;
using Azure.Communication.Email;
using PortfolioAPI.Models;

namespace PortfolioAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ContactController : ControllerBase
    {
        private static readonly Regex EmailPattern =
            new(@"^[^\s@]+@[^\s@]+\.[^\s@]+$", RegexOptions.Compiled);

        private readonly EmailClient _emailClient;
        private readonly string _senderAddress;
        private readonly string _recipientAddress;
        private readonly ILogger<ContactController> _logger;

        public ContactController(EmailClient emailClient, IConfiguration configuration, ILogger<ContactController> logger)
        {
            _emailClient = emailClient;
            _logger = logger;

            // e.g. "DoNotReply@<your-id>.azurecomm.net" — the Azure-managed sender you provisioned
            _senderAddress = configuration["Acs:SenderAddress"]
                ?? throw new InvalidOperationException("Acs:SenderAddress is not configured.");

            // Where contact-form messages should land — almost certainly your own inbox
            _recipientAddress = configuration["Acs:RecipientAddress"]
                ?? throw new InvalidOperationException("Acs:RecipientAddress is not configured.");
        }

        [HttpPost]
        public async Task<IActionResult> Submit([FromBody] Contact message)
        {
            // Honeypot check first — bail silently, no error, no hint it was caught
            if (!string.IsNullOrWhiteSpace(message.Honey))
            {
                return Ok(new { status = "received" }); // lie to the bot; look successful
            }

            // Real validation — mirrors the frontend, but this is the copy that actually matters
            var errors = new List<string>();

            if (string.IsNullOrWhiteSpace(message.FirstName))
                errors.Add("First name is required.");
            if (string.IsNullOrWhiteSpace(message.LastName))
                errors.Add("Last name is required.");
            if (string.IsNullOrWhiteSpace(message.Email) || !EmailPattern.IsMatch(message.Email))
                errors.Add("A valid email is required.");
            if (string.IsNullOrWhiteSpace(message.Subject))
                errors.Add("Subject is required.");
            if (string.IsNullOrWhiteSpace(message.Message))
                errors.Add("Message can't be empty.");

            // Basic length sanity checks — protects against absurdly large payloads
            if (message.Message?.Length > 5000)
                errors.Add("Message is too long.");

            if (errors.Count > 0)
                return BadRequest(new { errors });

            try
            {
                await SendNotificationEmailAsync(message);
            }
            catch (RequestFailedException ex)
            {
                // ACS itself rejected the request (bad sender, domain not verified, throttled, etc.)
                _logger.LogError(ex, "ACS rejected the contact form email.");
                return StatusCode(502, new { errors = new[] { "Message couldn't be sent right now. Please try again shortly." } });
            }

            return Ok(new { status = "received" });
        }

        private async Task SendNotificationEmailAsync(Contact message)
        {
            var subject = $"Portfolio contact: {message.Subject}";

            var plainText =
                $"From: {message.FirstName} {message.LastName} ({message.Email})\n" +
                $"Phone: {(string.IsNullOrWhiteSpace(message.Phone) ? "—" : message.Phone)}\n\n" +
                $"{message.Message}";

            var emailMessage = new EmailMessage(
                senderAddress: _senderAddress,
                content: new EmailContent(subject)
                {
                    PlainText = plainText,
                },
                // replyTo lets you hit "reply" in your inbox and answer the sender directly,
                // even though the email technically came from your azurecomm.net address
                recipients: new EmailRecipients(new List<EmailAddress> { new EmailAddress(_recipientAddress) })
            );

            emailMessage.ReplyTo.Add(new EmailAddress(message.Email));

            // WaitUntil.Completed blocks until ACS confirms the send (or throws) — fine for
            // a low-volume contact form; switch to WaitUntil.Started if you want a faster
            // response and don't need to confirm delivery before replying to the client.
            await _emailClient.SendAsync(WaitUntil.Completed, emailMessage);
        }
    }
}