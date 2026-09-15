using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;
using PortfolioAPI.Models;
using PortfolioAPI.Services;

namespace PortfolioAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [EnableRateLimiting("chat")]
    public class ChatController : ControllerBase
    {
        private readonly ChatService _chatService;
        private readonly ILogger<ChatController> _logger;

        public ChatController(ChatService chatService, ILogger<ChatController> logger)
        {
            _chatService = chatService;
            _logger = logger;
        }

        [HttpPost]
        public async Task<IActionResult> Ask([FromBody] ChatRequest request)
        {
            // Honeypot check first — same pattern as ContactController
            if (!string.IsNullOrWhiteSpace(request.Honey))
            {
                return Ok(new ChatResponse { Answer = "..." });
            }

            if (string.IsNullOrWhiteSpace(request.Question))
            {
                return BadRequest(new { errors = new[] { "Question can't be empty." } });
            }

            if (request.Question.Length > 500)
            {
                return BadRequest(new { errors = new[] { "Question is too long." } });
            }

            var answer = await _chatService.GetAnswerAsync(request.Question);

            if (answer is null)
            {
                return StatusCode(503, new { errors = new[] { "Chat isn't available right now. Please try again shortly." } });
            }

            return Ok(new ChatResponse { Answer = answer });
        }
    }
}