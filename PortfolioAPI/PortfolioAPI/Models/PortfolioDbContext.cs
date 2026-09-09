using Microsoft.EntityFrameworkCore;

namespace PortfolioAPI.Models
{
    public class PortfolioDbContext : DbContext
    {
        public PortfolioDbContext(DbContextOptions<PortfolioDbContext> options)
            : base(options)
        {
        }

        public DbSet<Project> Projects => Set<Project>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Project>().HasData(
                new Project
                {
                    Id = 1,
                    Title = "Capstone Project Management App",
                    Description = "MERN application built to manage 15+ CSCI capstone projects, featuring metadata display and secure file upload/download.",
                    TechStack = new List<string> { "MongoDB", "Express", "React", "Node.js" },
                    Category = "Work"
                },
                new Project
                {
                    Id = 2,
                    Title = "Asset Inventory System",
                    Description = "ReactJS/Django/SQL application tracking 500+ campus devices, supporting GLBA compliance with data display, updates, and data analysis.",
                    TechStack = new List<string> { "React", "Django", "SQL" },
                    Category = "Work"
                },
                new Project
                {
                    Id = 3,
                    Title = "Frisbee Golf Score Tracker",
                    Description = "Mobile app built with React Native and Expo Go, deployed to AWS using Lambda for stat calculations, DynamoDB for score storage, and IAM for permissions.",
                    TechStack = new List<string> { "React Native", "TypeScript", "AWS Lambda", "DynamoDB" },
                    Category = "Personal"
                },
                new Project
                {
                    Id = 4,
                    Title = "Automated Software Package Installer",
                    Description = "Windows installer automating software rollouts, with a ReactJS dashboard for role-based install permissions, running in a Dockerized SQL Server/C#/.NET environment.",
                    TechStack = new List<string> { "C#", ".NET", "Docker", "SQL Server", "React" },
                    Category = "Personal"
                },
                new Project
                {
                    Id = 5,
                    Title = "Portfolio Website",
                    Description = "Full-stack portfolio site with an ASP.NET Core Web API backend, a React/TypeScript frontend, and an Azure SQL database, deployed on Azure Static Web Apps and App Service.",
                    TechStack = new List<string> { "C#", "ASP.NET Core", "React", "TypeScript", "Azure SQL", "Azure App Service" },
                    GitHubUrl = "https://github.com/dgarstecki-dev/portfolio",
                    Category = "Personal"
                }
            );
        }
    }
}