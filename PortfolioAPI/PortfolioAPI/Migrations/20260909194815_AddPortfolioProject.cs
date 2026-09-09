using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace PortfolioAPI.Migrations
{
    /// <inheritdoc />
    public partial class AddPortfolioProject : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Projects",
                columns: new[] { "Id", "Category", "Description", "GitHubUrl", "LiveUrl", "TechStack", "Title" },
                values: new object[,]
                {
                    { 1, "Work", "MERN application built to manage 15+ CSCI capstone projects, featuring metadata display and secure file upload/download.", null, null, "[\"MongoDB\",\"Express\",\"React\",\"Node.js\"]", "Capstone Project Management App" },
                    { 2, "Work", "ReactJS/Django/SQL application tracking 500+ campus devices, supporting GLBA compliance with data display, updates, and data analysis.", null, null, "[\"React\",\"Django\",\"SQL\"]", "Asset Inventory System" },
                    { 3, "Personal", "Mobile app built with React Native and Expo Go, deployed to AWS using Lambda for stat calculations, DynamoDB for score storage, and IAM for permissions.", null, null, "[\"React Native\",\"TypeScript\",\"AWS Lambda\",\"DynamoDB\"]", "Frisbee Golf Score Tracker" },
                    { 4, "Personal", "Windows installer automating software rollouts, with a ReactJS dashboard for role-based install permissions, running in a Dockerized SQL Server/C#/.NET environment.", null, null, "[\"C#\",\".NET\",\"Docker\",\"SQL Server\",\"React\"]", "Automated Software Package Installer" },
                    { 5, "Personal", "Full-stack portfolio site with an ASP.NET Core Web API backend, a React/TypeScript frontend, and an Azure SQL database, deployed on Azure Static Web Apps and App Service.", "https://github.com/dgarstecki-dev/portfolio", null, "[\"C#\",\"ASP.NET Core\",\"React\",\"TypeScript\",\"Azure SQL\",\"Azure App Service\"]", "Portfolio Website" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Projects",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Projects",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Projects",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Projects",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Projects",
                keyColumn: "Id",
                keyValue: 5);
        }
    }
}
