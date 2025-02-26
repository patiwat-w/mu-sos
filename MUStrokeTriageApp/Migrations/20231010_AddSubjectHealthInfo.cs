using Microsoft.EntityFrameworkCore.Migrations;
using System;

namespace MUStrokeTriageApp.Migrations
{
    public partial class AddSubjectHealthInfo : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "SubjectHealthInfo",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    SubjectId = table.Column<int>(nullable: false),
                    Comorbidities_Hypertension = table.Column<bool>(nullable: true, defaultValue: false),
                    Comorbidities_Diabetes = table.Column<bool>(nullable: true, defaultValue: true),
                    Comorbidities_Hyperlipidemia = table.Column<bool>(nullable: true, defaultValue: false),
                    Comorbidities_HeartDisease = table.Column<bool>(nullable: true, defaultValue: false),
                    Comorbidities_PreviousStroke = table.Column<bool>(nullable: true, defaultValue: true),
                    Symptoms_SpeechDifficulties = table.Column<bool>(nullable: true, defaultValue: false),
                    Symptoms_FacialDrooping = table.Column<bool>(nullable: true, defaultValue: true),
                    Symptoms_VisualProblems = table.Column<bool>(nullable: true, defaultValue: false),
                    Symptoms_ArmLt = table.Column<bool>(nullable: true, defaultValue: true),
                    Symptoms_ArmRt = table.Column<bool>(nullable: true, defaultValue: false),
                    Symptoms_LegLt = table.Column<bool>(nullable: true, defaultValue: false),
                    Symptoms_LegRt = table.Column<bool>(nullable: true, defaultValue: true),
                    NHISS_Consciousness = table.Column<int>(nullable: true),
                    NHISS_Question = table.Column<int>(nullable: true),
                    NHISS_Commands = table.Column<int>(nullable: true),
                    NHISS_Gaze = table.Column<int>(nullable: true),
                    NHISS_VisualField = table.Column<int>(nullable: true),
                    NHISS_FacialPalsy = table.Column<int>(nullable: true),
                    NHISS_ArmStrengthLeft = table.Column<int>(nullable: true),
                    NHISS_ArmStrengthRight = table.Column<int>(nullable: true),
                    NHISS_LegStrengthLeft = table.Column<int>(nullable: true),
                    NHISS_LegStrengthRight = table.Column<int>(nullable: true),
                    NHISS_Ataxia = table.Column<int>(nullable: true),
                    NHISS_Sensory = table.Column<int>(nullable: true),
                    Created_Date = table.Column<DateTime>(nullable: true, defaultValue: DateTime.Now),
                    Modified_Date = table.Column<DateTime>(nullable: true, defaultValue: DateTime.Now),
                    Created_By = table.Column<string>(maxLength: 50, nullable: true),
                    Modified_By = table.Column<string>(maxLength: 50, nullable: true),
                    State_Code = table.Column<int>(nullable: true, defaultValue: 1)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SubjectHealthInfo", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "SubjectHealthInfo");
        }
    }
}
