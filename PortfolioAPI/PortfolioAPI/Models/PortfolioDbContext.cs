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
    }
}