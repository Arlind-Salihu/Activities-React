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

            migrationBuilder.AddColumn<bool>(
                name: "IsCancelled",
                table: "Telefonat",
                type: "INTEGER",
                nullable: false,
                defaultValue: false);            
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsCancelled",
                table: "Telefonat");

            migrationBuilder.RenameColumn(
                name: "isHost",
                table: "TelefonatPrezencas",
                newName: "IsHost");            
        }
    }
}
