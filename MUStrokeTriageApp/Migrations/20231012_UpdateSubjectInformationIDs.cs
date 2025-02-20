using Microsoft.EntityFrameworkCore.Migrations;

public partial class UpdateSubjectInformationIDs : Migration
{
    protected override void Up(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.Sql(@"
            WITH CTE AS (
                SELECT ID, ROW_NUMBER() OVER (ORDER BY (SELECT NULL)) AS NewID
                FROM SubjectInformation
            )
            UPDATE SubjectInformation
            SET ID = CTE.NewID
            FROM CTE
            WHERE SubjectInformation.ID = CTE.ID;
        ");
    }

    protected override void Down(MigrationBuilder migrationBuilder)
    {
        // No need to revert data changes
    }
}

