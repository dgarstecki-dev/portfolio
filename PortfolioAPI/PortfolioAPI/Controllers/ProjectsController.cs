using Microsoft.AspNetCore.Mvc;
using PortfolioAPI.Models;

namespace PortfolioAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProjectsController : ControllerBase
    {
        private static readonly List<Project> Projects = new()
        {
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
                Description = "ReactJS/Django/SQL application tracking 500+ campus devices, supporting GLBA compliance with data display, updates, and reporting.",
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
            }
        };

        [HttpGet]
        public ActionResult<IEnumerable<Project>> GetAll()
        {
            return Ok(Projects);
        }

        [HttpGet("{id}")]
        public ActionResult<Project> GetById(int id)
        {
            var project = Projects.FirstOrDefault(p => p.Id == id);
            if (project == null)
                return NotFound();

            return Ok(project);
        }
    }
}