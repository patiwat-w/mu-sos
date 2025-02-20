using Microsoft.EntityFrameworkCore.Migrations;

public partial class TemporaryDropUniqueConstraintOnID : Migration
{
    protected override void Up(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.DropPrimaryKey(
            name: "PK_SubjectInformation",
            table: "SubjectInformation");

        migrationBuilder.AlterColumn<int>(
            name: "ID",
            table: "SubjectInformation",
            nullable: true,
            oldClrType: typeof(int),
            oldType: "INTEGER");
    }

    protected override void Down(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.AlterColumn<int>(
            name: "ID",
            table: "SubjectInformation",
            nullable: false,
            oldClrType: typeof(int),
            oldType: "INTEGER",
            oldNullable: true);

        migrationBuilder.AddPrimaryKey(
            name: "PK_SubjectInformation",
            table: "SubjectInformation",
            column: "ID");
    }
}
