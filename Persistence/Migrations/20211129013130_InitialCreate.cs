using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Laptopat",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    Emri = table.Column<string>(type: "TEXT", nullable: true),
                    Kategoria = table.Column<string>(type: "TEXT", nullable: true),
                    Brendi = table.Column<string>(type: "TEXT", nullable: true),
                    Data = table.Column<DateTime>(type: "TEXT", nullable: false),
                    Pershkrimi = table.Column<string>(type: "TEXT", nullable: true),
                    Cmimi = table.Column<decimal>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Laptopat", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Telefonat",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    Emri = table.Column<string>(type: "TEXT", nullable: true),
                    Kategoria = table.Column<string>(type: "TEXT", nullable: true),
                    Brendi = table.Column<string>(type: "TEXT", nullable: true),
                    Data = table.Column<DateTime>(type: "TEXT", nullable: false),
                    Pershkrimi = table.Column<string>(type: "TEXT", nullable: true),
                    Cmimi = table.Column<decimal>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Telefonat", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Laptopat");

            migrationBuilder.DropTable(
                name: "Telefonat");
        }
    }
}
