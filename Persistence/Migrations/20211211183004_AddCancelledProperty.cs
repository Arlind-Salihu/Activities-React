using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class AddCancelledProperty : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // migrationBuilder.RenameColumn(
            //     name: "IsHost",
            //     table: "TelefonatPrezencas",
            //     newName: "isHost");

            // migrationBuilder.RenameColumn(
            //     name: "IsHost",
            //     table: "OratPrezencas",
            //     newName: "isHost");

            // migrationBuilder.RenameColumn(
            //     name: "IsHost",
            //     table: "LaptopatPrezencas",
            //     newName: "isHost");

            migrationBuilder.AddColumn<bool>(
                name: "IsCancelled",
                table: "Telefonat",
                type: "INTEGER",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsCancelled",
                table: "Orat",
                type: "INTEGER",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsCancelled",
                table: "Laptopat",
                type: "INTEGER",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsCancelled",
                table: "Telefonat");

            migrationBuilder.DropColumn(
                name: "IsCancelled",
                table: "Orat");

            migrationBuilder.DropColumn(
                name: "IsCancelled",
                table: "Laptopat");

            migrationBuilder.RenameColumn(
                name: "isHost",
                table: "TelefonatPrezencas",
                newName: "IsHost");

            migrationBuilder.RenameColumn(
                name: "isHost",
                table: "OratPrezencas",
                newName: "IsHost");

            migrationBuilder.RenameColumn(
                name: "isHost",
                table: "LaptopatPrezencas",
                newName: "IsHost");
        }
    }
}
