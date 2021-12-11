using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class Prezenca : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "LaptopatPrezencas",
                columns: table => new
                {
                    AppUserId = table.Column<string>(type: "TEXT", nullable: false),
                    LaptopiId = table.Column<Guid>(type: "TEXT", nullable: false),
                    isHost = table.Column<bool>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LaptopatPrezencas", x => new { x.AppUserId, x.LaptopiId });
                    table.ForeignKey(
                        name: "FK_LaptopatPrezencas_AspNetUsers_AppUserId",
                        column: x => x.AppUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_LaptopatPrezencas_Laptopat_LaptopiId",
                        column: x => x.LaptopiId,
                        principalTable: "Laptopat",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "OratPrezencas",
                columns: table => new
                {
                    AppUserId = table.Column<string>(type: "TEXT", nullable: false),
                    OraId = table.Column<Guid>(type: "TEXT", nullable: false),
                    isHost = table.Column<bool>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OratPrezencas", x => new { x.AppUserId, x.OraId });
                    table.ForeignKey(
                        name: "FK_OratPrezencas_AspNetUsers_AppUserId",
                        column: x => x.AppUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_OratPrezencas_Orat_OraId",
                        column: x => x.OraId,
                        principalTable: "Orat",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TelefonatPrezencas",
                columns: table => new
                {
                    AppUserId = table.Column<string>(type: "TEXT", nullable: false),
                    TelefoniId = table.Column<Guid>(type: "TEXT", nullable: false),
                    isHost = table.Column<bool>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TelefonatPrezencas", x => new { x.AppUserId, x.TelefoniId });
                    table.ForeignKey(
                        name: "FK_TelefonatPrezencas_AspNetUsers_AppUserId",
                        column: x => x.AppUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TelefonatPrezencas_Telefonat_TelefoniId",
                        column: x => x.TelefoniId,
                        principalTable: "Telefonat",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_LaptopatPrezencas_LaptopiId",
                table: "LaptopatPrezencas",
                column: "LaptopiId");

            migrationBuilder.CreateIndex(
                name: "IX_OratPrezencas_OraId",
                table: "OratPrezencas",
                column: "OraId");

            migrationBuilder.CreateIndex(
                name: "IX_TelefonatPrezencas_TelefoniId",
                table: "TelefonatPrezencas",
                column: "TelefoniId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "LaptopatPrezencas");

            migrationBuilder.DropTable(
                name: "OratPrezencas");

            migrationBuilder.DropTable(
                name: "TelefonatPrezencas");
        }
    }
}
