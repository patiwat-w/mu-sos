using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MUStrokeTriageApp.Migrations
{
    /// <inheritdoc />
    public partial class AddSubjectModel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "SubjectInformation",
                columns: table => new
                {
                    Subject_ID = table.Column<string>(type: "TEXT", maxLength: 20, nullable: false),
                    Phone_Number = table.Column<string>(type: "TEXT", maxLength: 15, nullable: true),
                    Onset_Time = table.Column<DateTime>(type: "TEXT", nullable: false),
                    Last_Seen_Normal_Time = table.Column<DateTime>(type: "TEXT", nullable: false),
                    First_Name = table.Column<string>(type: "TEXT", maxLength: 50, nullable: true),
                    Last_Name = table.Column<string>(type: "TEXT", maxLength: 50, nullable: true),
                    Created_Date = table.Column<DateTime>(type: "TEXT", nullable: false),
                    Modified_Date = table.Column<DateTime>(type: "TEXT", nullable: false),
                    Created_By = table.Column<string>(type: "TEXT", maxLength: 50, nullable: true),
                    Modified_By = table.Column<string>(type: "TEXT", maxLength: 50, nullable: true),
                    State_Code = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SubjectInformation", x => x.Subject_ID);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "SubjectInformation");
        }
    }
}
