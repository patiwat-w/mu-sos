using Microsoft.EntityFrameworkCore.Migrations;

public partial class UserAndUserAuthenticationMethodMigration : Migration
{
    protected override void Up(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.CreateTable(
            name: "Users",
            columns: table => new
            {
                Id = table.Column<int>(nullable: false)
                    .Annotation("SqlServer:Identity", "1, 1"),
                FirstName = table.Column<string>(nullable: false),
                LastName = table.Column<string>(nullable: false),
                Name = table.Column<string>(nullable: false),
                Email = table.Column<string>(nullable: false),
                CreatedDate = table.Column<DateTime>(nullable: false),
                Role = table.Column<string>(nullable: false)
                // Add other columns as needed
            },
            constraints: table =>
            {
                table.PrimaryKey("PK_Users", x => x.Id);
            });

        migrationBuilder.CreateTable(
            name: "UserAuthenticationMethod",
            columns: table => new
            {
                Id = table.Column<int>(nullable: false)
                    .Annotation("SqlServer:Identity", "1, 1"),
                UserId = table.Column<int>(nullable: false),
                Provider = table.Column<int>(nullable: false),
                ProviderKey = table.Column<string>(nullable: false),
                DisplayName = table.Column<string>(nullable: true),
                Email = table.Column<string>(nullable: true),
                PhotoURL = table.Column<string>(nullable: true)
            },
            constraints: table =>
            {
                table.PrimaryKey("PK_UserAuthenticationMethod", x => x.Id);
                table.ForeignKey(
                    name: "FK_UserAuthenticationMethod_Users_UserId",
                    column: x => x.UserId,
                    principalTable: "Users",
                    principalColumn: "Id",
                    onDelete: ReferentialAction.Cascade);
            });

        migrationBuilder.CreateIndex(
            name: "IX_UserAuthenticationMethod_UserId",
            table: "UserAuthenticationMethod",
            column: "UserId");
    }

    protected override void Down(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.DropTable(
            name: "UserAuthenticationMethod");

        migrationBuilder.DropTable(
            name: "Users");
    }
}
