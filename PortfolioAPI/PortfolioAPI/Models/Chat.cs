namespace PortfolioAPI.Models
{
    public class ChatRequest
    {
        public string Question { get; init; } = string.Empty;
        public string? Honey { get; init; } // honeypot — same pattern as Contact
    }

    public class ChatResponse
    {
        public string Answer { get; init; } = string.Empty;
    }
}