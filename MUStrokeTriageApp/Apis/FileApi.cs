using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using Microsoft.EntityFrameworkCore;
using System;
using System.IO;
using System.Threading.Tasks;

/// <summary>
/// Provides endpoints for file operations.
/// </summary>
public static class FileApi
{
    /// <summary>
    /// Maps the file upload endpoint.
    /// </summary>
    /// <param name="app">The endpoint route builder.</param>
    public static void Map(IEndpointRouteBuilder app)
    {
        var uploadApi = app.MapGroup("/file");

        /// <summary>
        /// Lists all files.
        /// </summary>
        /// <param name="db">The data context.</param>
        /// <returns>A list of files.</returns>
        uploadApi.MapGet("/list", async (DataContext db) =>
        {
            try
            {
                return Results.Ok(await db.Set<FileModel>().ToListAsync());
            }
            catch (Exception)
            {
                // Log exception
                return Results.Problem("An error occurred while retrieving users.");
            }
            finally
            {
                await db.DisposeAsync();
            }
        });

        /// <summary>
        /// Uploads a file.
        /// </summary>
        /// <param name="context">The HTTP context.</param>
        uploadApi.MapPost("/upload", async (HttpContext context, DataContext db) =>
        {
            var request = context.Request;

            if (!request.HasFormContentType)
            {
                context.Response.StatusCode = 400;
                await context.Response.WriteAsync("Invalid content type.");
                return;
            }

            var form = await request.ReadFormAsync();
            var file = form.Files["file"];
            var subjectId = form["SubjectId"];
            var userId = form["UserId"];

            if (file == null || string.IsNullOrEmpty(subjectId) || string.IsNullOrEmpty(userId))
            {
                context.Response.StatusCode = 400;
                await context.Response.WriteAsync("Missing required fields.");
                return;
            }

            var uploadsFolder = Path.Combine("D:", "MU", "Sources", "MUStrokeTriageApp", "UploadedFiles");
            if (!Directory.Exists(uploadsFolder))
            {
                Directory.CreateDirectory(uploadsFolder);
            }

            var filePath = Path.Combine(uploadsFolder, file.FileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            var fileModel = new FileModel
            {
                Name = file.FileName,
                FilePath = filePath,
                SubjectId = int.Parse(subjectId),
                UserId = int.Parse(userId),
                CreationTime = DateTime.UtcNow
            };

            db.Files.Add(fileModel);
            await db.SaveChangesAsync();

            await context.Response.WriteAsJsonAsync(fileModel); // Return the inserted record as JSON
        });
    }
}
