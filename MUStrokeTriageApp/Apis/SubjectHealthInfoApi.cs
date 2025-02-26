using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Routing;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Threading.Tasks;

public static class SubjectHealthInfoApi
{
    public static void Map(IEndpointRouteBuilder app, ILogger logger)
    {
        var healthInfoApi = app.MapGroup("/subjecthealthinfo");

        healthInfoApi.MapGet("/", async (DataContext db) =>
        {
            try
            {
                return Results.Ok(await db.Set<SubjectHealthInfoModel>().ToListAsync());
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "An error occurred while retrieving health information.");
                return Results.Problem("An error occurred while retrieving health information.");
            }
            finally
            {
                await db.DisposeAsync();
            }
        });
        //.WithName("GetAllSubjectHealthInfo");

        healthInfoApi.MapGet("/{id}", async (string id, DataContext db) =>
        {
            try
            {
                if (!int.TryParse(id, out var healthInfoId))
                {
                    return Results.BadRequest("Invalid health information ID.");
                }

                var healthInfo = await db.SubjectHealthInfos.FindAsync(healthInfoId);
                return healthInfo is not null ? Results.Ok(healthInfo) : Results.NotFound();
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "An error occurred while retrieving the health information.");
                return Results.Problem("An error occurred while retrieving the health information.");
            }
            finally
            {
                await db.DisposeAsync();
            }
        });
        //.WithName("GetSubjectHealthInfoById");

        healthInfoApi.MapPost("/", async (SubjectHealthInfoModel healthInfo, DataContext db) =>
        {
            try
            {
                var newHealthInfo = new SubjectHealthInfoModel
                {
                    // Map properties from the input model
                    SubjectId = healthInfo.SubjectId,
                    Comorbidities_Hypertension = healthInfo.Comorbidities_Hypertension,
                    Comorbidities_Diabetes = healthInfo.Comorbidities_Diabetes,
                    Comorbidities_Hyperlipidemia = healthInfo.Comorbidities_Hyperlipidemia,
                    Comorbidities_HeartDisease = healthInfo.Comorbidities_HeartDisease,
                    Comorbidities_PreviousStroke = healthInfo.Comorbidities_PreviousStroke,
                    Symptoms_SpeechDifficulties = healthInfo.Symptoms_SpeechDifficulties,
                    Symptoms_FacialDrooping = healthInfo.Symptoms_FacialDrooping,
                    Symptoms_VisualProblems = healthInfo.Symptoms_VisualProblems,
                    Symptoms_ArmLt = healthInfo.Symptoms_ArmLt,
                    Symptoms_ArmRt = healthInfo.Symptoms_ArmRt,
                    Symptoms_LegLt = healthInfo.Symptoms_LegLt,
                    Symptoms_LegRt = healthInfo.Symptoms_LegRt,
                    NHISS_Consciousness = healthInfo.NHISS_Consciousness,
                    NHISS_Question = healthInfo.NHISS_Question,
                    NHISS_Commands = healthInfo.NHISS_Commands,
                    NHISS_Gaze = healthInfo.NHISS_Gaze,
                    NHISS_VisualField = healthInfo.NHISS_VisualField,
                    NHISS_FacialPalsy = healthInfo.NHISS_FacialPalsy,
                    NHISS_ArmStrengthLeft = healthInfo.NHISS_ArmStrengthLeft,
                    NHISS_ArmStrengthRight = healthInfo.NHISS_ArmStrengthRight,
                    NHISS_LegStrengthLeft = healthInfo.NHISS_LegStrengthLeft,
                    NHISS_LegStrengthRight = healthInfo.NHISS_LegStrengthRight,
                    NHISS_Ataxia = healthInfo.NHISS_Ataxia,
                    NHISS_Sensory = healthInfo.NHISS_Sensory,
                    CreatedDate = DateTime.Now,
                    CreatedBy = healthInfo.CreatedBy,
                    StateCode = healthInfo.StateCode
                };
                db.SubjectHealthInfos.Add(newHealthInfo);
                await db.SaveChangesAsync();
                return Results.Created($"/api/subjecthealthinfo/{newHealthInfo.Id}", newHealthInfo);
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "An error occurred while creating the health information.");
                return Results.Problem("An error occurred while creating the health information.");
            }
            finally
            {
                await db.DisposeAsync();
            }
        });
        //.WithName("CreateSubjectHealthInfo");

        healthInfoApi.MapPut("/{id}", async (string id, SubjectHealthInfoModel updatedHealthInfo, DataContext db) =>
        {
            try
            {
                if (!int.TryParse(id, out var healthInfoId))
                {
                    return Results.BadRequest("Invalid health information ID.");
                }

                var healthInfo = await db.SubjectHealthInfos.FindAsync(healthInfoId);
                if (healthInfo is null) return Results.NotFound();

                // Update properties
                healthInfo.Comorbidities_Hypertension = updatedHealthInfo.Comorbidities_Hypertension;
                healthInfo.Comorbidities_Diabetes = updatedHealthInfo.Comorbidities_Diabetes;
                healthInfo.Comorbidities_Hyperlipidemia = updatedHealthInfo.Comorbidities_Hyperlipidemia;
                healthInfo.Comorbidities_HeartDisease = updatedHealthInfo.Comorbidities_HeartDisease;
                healthInfo.Comorbidities_PreviousStroke = updatedHealthInfo.Comorbidities_PreviousStroke;
                healthInfo.Symptoms_SpeechDifficulties = updatedHealthInfo.Symptoms_SpeechDifficulties;
                healthInfo.Symptoms_FacialDrooping = updatedHealthInfo.Symptoms_FacialDrooping;
                healthInfo.Symptoms_VisualProblems = updatedHealthInfo.Symptoms_VisualProblems;
                healthInfo.Symptoms_ArmLt = updatedHealthInfo.Symptoms_ArmLt;
                healthInfo.Symptoms_ArmRt = updatedHealthInfo.Symptoms_ArmRt;
                healthInfo.Symptoms_LegLt = updatedHealthInfo.Symptoms_LegLt;
                healthInfo.Symptoms_LegRt = updatedHealthInfo.Symptoms_LegRt;
                healthInfo.NHISS_Consciousness = updatedHealthInfo.NHISS_Consciousness;
                healthInfo.NHISS_Question = updatedHealthInfo.NHISS_Question;
                healthInfo.NHISS_Commands = updatedHealthInfo.NHISS_Commands;
                healthInfo.NHISS_Gaze = updatedHealthInfo.NHISS_Gaze;
                healthInfo.NHISS_VisualField = updatedHealthInfo.NHISS_VisualField;
                healthInfo.NHISS_FacialPalsy = updatedHealthInfo.NHISS_FacialPalsy;
                healthInfo.NHISS_ArmStrengthLeft = updatedHealthInfo.NHISS_ArmStrengthLeft;
                healthInfo.NHISS_ArmStrengthRight = updatedHealthInfo.NHISS_ArmStrengthRight;
                healthInfo.NHISS_LegStrengthLeft = updatedHealthInfo.NHISS_LegStrengthLeft;
                healthInfo.NHISS_LegStrengthRight = updatedHealthInfo.NHISS_LegStrengthRight;
                healthInfo.NHISS_Ataxia = updatedHealthInfo.NHISS_Ataxia;
                healthInfo.NHISS_Sensory = updatedHealthInfo.NHISS_Sensory;
                healthInfo.ModifiedDate = DateTime.Now;
                healthInfo.ModifiedBy = updatedHealthInfo.ModifiedBy;
                healthInfo.StateCode = updatedHealthInfo.StateCode;

                await db.SaveChangesAsync();
                return Results.NoContent();
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "An error occurred while updating the health information.");
                return Results.Problem("An error occurred while updating the health information.");
            }
            finally
            {
                await db.DisposeAsync();
            }
        });
        //.WithName("UpdateSubjectHealthInfo");

        healthInfoApi.MapDelete("/{id}", async (string id, DataContext db) =>
        {
            try
            {
                if (!int.TryParse(id, out var healthInfoId))
                {
                    return Results.BadRequest("Invalid health information ID.");
                }

                var healthInfo = await db.SubjectHealthInfos.FindAsync(healthInfoId);
                if (healthInfo is null) return Results.NotFound();

                db.SubjectHealthInfos.Remove(healthInfo);
                await db.SaveChangesAsync();
                return Results.NoContent();
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "An error occurred while deleting the health information.");
                return Results.Problem("An error occurred while deleting the health information.");
            }
            finally
            {
                await db.DisposeAsync();
            }
        });
        //.WithName("DeleteSubjectHealthInfo");
    }
}