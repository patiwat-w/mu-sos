using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MUStrokeTriageApp.Migrations
{
    /// <inheritdoc />
    public partial class UserAndUserAuthenticationMethodMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "UserAccount",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", maxLength: 100, nullable: false),
                    First_Name = table.Column<string>(type: "TEXT", maxLength: 100, nullable: false),
                    Last_Name = table.Column<string>(type: "TEXT", maxLength: 100, nullable: false),
                    Email = table.Column<string>(type: "TEXT", nullable: false),
                    Role = table.Column<int>(type: "INTEGER", nullable: false),
                    Token = table.Column<string>(type: "TEXT", nullable: true),
                    LastLoginDate = table.Column<DateTime>(type: "TEXT", nullable: true),
                    Created_Date = table.Column<DateTime>(type: "TEXT", nullable: false),
                    Modified_Date = table.Column<DateTime>(type: "TEXT", nullable: false),
                    Created_By = table.Column<string>(type: "TEXT", maxLength: 50, nullable: true),
                    Modified_By = table.Column<string>(type: "TEXT", maxLength: 50, nullable: true),
                    State_Code = table.Column<int>(type: "INTEGER", nullable: false),
                    DisplayName = table.Column<string>(type: "TEXT", nullable: true),
                    PhotoURL = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserAccount", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "UserAuthenticationMethod",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    UserId = table.Column<int>(type: "INTEGER", nullable: false),
                    Provider = table.Column<int>(type: "INTEGER", nullable: false),
                    ProviderKey = table.Column<string>(type: "TEXT", nullable: false),
                    DisplayName = table.Column<string>(type: "TEXT", nullable: true),
                    Email = table.Column<string>(type: "TEXT", nullable: true),
                    PhotoURL = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserAuthenticationMethod", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserAuthenticationMethod_UserAccount_UserId",
                        column: x => x.UserId,
                        principalTable: "UserAccount",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_UserAuthenticationMethod_UserId",
                table: "UserAuthenticationMethod",
                column: "UserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "UserAuthenticationMethod");

            migrationBuilder.DropTable(
                name: "UserAccount");
        }
    }
}
