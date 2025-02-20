using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MUStrokeTriageApp.Migrations
{
    /// <inheritdoc />
    public partial class AddIdToSubjectPK : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_SubjectInformation",
                table: "SubjectInformation");

            migrationBuilder.AlterColumn<string>(
                name: "Subject_ID",
                table: "SubjectInformation",
                type: "TEXT",
                maxLength: 20,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "TEXT",
                oldMaxLength: 20);

            migrationBuilder.AddColumn<int>(
                name: "ID",
                table: "SubjectInformation",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0)
                .Annotation("Sqlite:Autoincrement", true);

            migrationBuilder.AddColumn<string>(
                name: "HN",
                table: "SubjectInformation",
                type: "TEXT",
                maxLength: 50,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SubjectName",
                table: "SubjectInformation",
                type: "TEXT",
                maxLength: 500,
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_SubjectInformation",
                table: "SubjectInformation",
                column: "ID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_SubjectInformation",
                table: "SubjectInformation");

            migrationBuilder.DropColumn(
                name: "ID",
                table: "SubjectInformation");

            migrationBuilder.DropColumn(
                name: "HN",
                table: "SubjectInformation");

            migrationBuilder.DropColumn(
                name: "SubjectName",
                table: "SubjectInformation");

            migrationBuilder.AlterColumn<string>(
                name: "Subject_ID",
                table: "SubjectInformation",
                type: "TEXT",
                maxLength: 20,
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "TEXT",
                oldMaxLength: 20,
                oldNullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_SubjectInformation",
                table: "SubjectInformation",
                column: "Subject_ID");
        }
    }
}
