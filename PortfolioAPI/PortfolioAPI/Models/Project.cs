namespace PortfolioAPI.Models
{
    public class Project
    {
        public int Id { get; init; }
        public string Title { get; init; } = string.Empty;
        public string Description { get; init; } = string.Empty;
        public List<string> TechStack { get; init; } = new();
        public string? GitHubUrl { get; init; }
        public string? LiveUrl { get; init; }
        public string Category { get; init; } = string.Empty; // e.g. "Work" or "Personal"
    }
}