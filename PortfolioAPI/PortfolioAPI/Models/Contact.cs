namespace PortfolioAPI.Models
{
    public class Contact
    {
        public string FirstName { get; init; } = string.Empty;
        public string LastName { get; init; } = string.Empty;
        public string Email { get; init; } = string.Empty;
        public string? Phone { get; init; }
        public string Subject { get; init; } = string.Empty;
        public string Message { get; init; } = string.Empty;
        public string? Honey { get; init; } // honeypot — should always be empty/null
    }
}