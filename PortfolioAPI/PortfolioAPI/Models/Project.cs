namespace PortfolioAPI.Models
{
    public class Project
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public List<string> TechStack { get; set; } = new();
        public string? GitHubUrl { get; set; }
        public string? LiveUrl { get; set; }
        public string Category { get; set; } = string.Empty; // e.g. "Work" or "Personal"
    }
}