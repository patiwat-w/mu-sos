using Microsoft.EntityFrameworkCore.Migrations;

public partial class AddIdToSubjectPK : Migration
{
    protected override void Up(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.DropPrimaryKey(
            name: "PK_Subjects",
            table: "Subjects");

        migrationBuilder.AddColumn<int>(
            name: "Id",
            table: "Subjects",
            nullable: false,
            defaultValue: 0)
            .Annotation("SqlServer:Identity", "1, 1");

        migrationBuilder.AddPrimaryKey(
            name: "PK_Subjects",
            table: "Subjects",
            column: "Id");
    }

    protected override void Down(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.DropPrimaryKey(
            name: "PK_Subjects",
            table: "Subjects");

        migrationBuilder.DropColumn(
            name: "Id",
            table: "Subjects");

        migrationBuilder.AddPrimaryKey(
            name: "PK_Subjects",
            table: "Subjects",
            column: "ExistingPrimaryKeyColumnName"); // Replace with the actual existing primary key column name
    }
}
