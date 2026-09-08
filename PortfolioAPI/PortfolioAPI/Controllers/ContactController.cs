using Microsoft.AspNetCore.Mvc;
using System.Text.RegularExpressions;
using PortfolioAPI.Models;

namespace PortfolioAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ContactController : ControllerBase
    {
        private static readonly Regex EmailPattern =
            new(@"^[^\s@]+@[^\s@]+\.[^\s@]+$", RegexOptions.Compiled);

        [HttpPost]
        public IActionResult Submit([FromBody] Contact message)
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

            // TODO: actually do something with a valid message —
            // e.g. send an email via SendGrid/Azure Communication Services,
            // or store it if you decide to add a Contact table later.

            return Ok(new { status = "received" });
        }
    }
}