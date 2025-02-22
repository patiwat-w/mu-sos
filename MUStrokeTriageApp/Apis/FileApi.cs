using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
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
        var configuration = app.ServiceProvider.GetRequiredService<IConfiguration>();
        var rootUploadFolder = configuration.GetValue<string>("UploadSettings:RootUploadFolder");

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
            var subjectId = form["SubjectId"].FirstOrDefault() ?? "Unknown";
            var documentType = form["DocumentType"].FirstOrDefault() ?? "Unknown";
            var userId = form["UserId"].FirstOrDefault() ?? "Unknown";

            if (file == null)
            {
                context.Response.StatusCode = 400;
                await context.Response.WriteAsync("Missing required fields.");
                return;
            }

            var uploadsFolder = Path.Combine(rootUploadFolder, $"User{userId}", $"Subject{subjectId}", documentType);
            if (!Directory.Exists(uploadsFolder))
            {
                Directory.CreateDirectory(uploadsFolder);
            }

            var timestamp = DateTime.UtcNow.ToString("yyyyMMddHHmmssfff");
            var fileNameWithTimestamp = $"{Path.GetFileNameWithoutExtension(file.FileName)}_{timestamp}{Path.GetExtension(file.FileName)}";
            var filePath = Path.Combine(uploadsFolder, fileNameWithTimestamp);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            var fileModel = new FileModel
            {
                Name = fileNameWithTimestamp,
                FilePath = filePath,
                SubjectId = subjectId == "Unknown" ? (int?)null : int.Parse(subjectId),
                UserId = userId == "Unknown" ? (int?)null : int.Parse(userId),
                FileType = documentType,
                CreationTime = DateTime.UtcNow
            };

            db.Files.Add(fileModel);
            await db.SaveChangesAsync();

            await context.Response.WriteAsJsonAsync(fileModel); // Return the inserted record as JSON
        });
    }
}
