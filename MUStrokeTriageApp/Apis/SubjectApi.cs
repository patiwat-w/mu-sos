using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Routing;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Threading.Tasks;

public static class SubjectApi
{
    public static void Map(IEndpointRouteBuilder app, ILogger logger)
    {
        var subjectsApi = app.MapGroup("/subjects");
        subjectsApi.MapGet("/", async (DataContext db) =>
        {
            try
            {
                return Results.Ok(await db.Set<SubjectModel>().ToListAsync());
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "An error occurred while retrieving subjects.");
                return Results.Problem("An error occurred while retrieving subjects.");
            }
            finally
            {
                await db.DisposeAsync();
            }
        });
        subjectsApi.MapGet("/{id}", async (string id, DataContext db) =>
        {
            try
            {
                if (!int.TryParse(id, out var subjectId))
                {
                    return Results.BadRequest("Invalid subject ID.");
                }

                var subject = await db.Subjects.FindAsync(subjectId);
                return subject is not null ? Results.Ok(subject) : Results.NotFound();
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "An error occurred while retrieving the subject.");
                return Results.Problem("An error occurred while retrieving the subject.");
            }
            finally
            {
                await db.DisposeAsync();
            }
        });
        subjectsApi.MapPost("/", async (SubjectModel subject, DataContext db) =>
        {
            try
            {
                var newSubject = new SubjectModel
                {
                    SubjectId = subject.SubjectId,
                    PhoneNumber = subject.PhoneNumber,
                    OnsetTime = subject.OnsetTime,
                    LastSeenNormalTime = subject.LastSeenNormalTime,
                    FirstName = subject.FirstName,
                    LastName = subject.LastName,
                    SubjectName = subject.SubjectName,
                    HN = subject.HN,
                    CreatedDate = DateTime.Now,
                    CreatedBy = subject.CreatedBy,
                    StateCode = subject.StateCode
                    // Map other properties as needed
                };
                db.Subjects.Add(newSubject);
                await db.SaveChangesAsync();
                return Results.Created($"/subjects/{newSubject.SubjectId}", newSubject);
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "An error occurred while creating the subject.");
                return Results.Problem("An error occurred while creating the subject.");
            }
            finally
            {
                await db.DisposeAsync();
            }
        });
        subjectsApi.MapPut("/{id}", async (string id, SubjectModel updatedSubject, DataContext db) =>
        {
            try
            {
                if (!int.TryParse(id, out var subjectId))
                {
                    return Results.BadRequest("Invalid subject ID.");
                }

                var subject = await db.Subjects.FindAsync(subjectId);
                if (subject is null) return Results.NotFound();

                subject.PhoneNumber = updatedSubject.PhoneNumber;
                subject.OnsetTime = updatedSubject.OnsetTime;
                subject.LastSeenNormalTime = updatedSubject.LastSeenNormalTime;
                subject.FirstName = updatedSubject.FirstName;
                subject.LastName = updatedSubject.LastName;
                subject.SubjectName = updatedSubject.SubjectName;
                subject.HN = updatedSubject.HN;
                subject.ModifiedDate = DateTime.Now;
                subject.ModifiedBy = updatedSubject.ModifiedBy;
                subject.StateCode = updatedSubject.StateCode;
                // Update other properties as needed

                await db.SaveChangesAsync();
                return Results.NoContent();
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "An error occurred while updating the subject.");
                return Results.Problem("An error occurred while updating the subject.");
            }
            finally
            {
                await db.DisposeAsync();
            }
        });
        subjectsApi.MapDelete("/{id}", async (string id, DataContext db) =>
        {
            try
            {
                if (!int.TryParse(id, out var subjectId))
                {
                    return Results.BadRequest("Invalid subject ID.");
                }

                var subject = await db.Subjects.FindAsync(subjectId);
                if (subject is null) return Results.NotFound();

                db.Subjects.Remove(subject);
                await db.SaveChangesAsync();
                return Results.NoContent();
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "An error occurred while deleting the subject.");
                return Results.Problem("An error occurred while deleting the subject.");
            }
            finally
            {
                await db.DisposeAsync();
            }
        });
    }
}
