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


        _ = uploadApi.MapPost("/upload", async (HttpContext context, DataContext db) =>
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
            var fileName = form["FileName"].FirstOrDefault() ?? "Unknown";
            var fileType = form["fileType"].FirstOrDefault() ?? "Unknown";
            var fileExtension = form["fileExtension"].FirstOrDefault() ?? "Unknown";
            var subjectId = form["SubjectId"].FirstOrDefault() ?? "Unknown";
            var fileCategory = form["FileCategory"].FirstOrDefault() ?? "Unknown";
            var fileInfo = form["FileInfo"].FirstOrDefault() ?? "Unknown";
            var userId = form["UserId"].FirstOrDefault() ?? "Unknown";

            if (file == null)
            {
                context.Response.StatusCode = 400;
                await context.Response.WriteAsync("Missing required fields.");
                return;
            }

            if (string.IsNullOrEmpty(rootUploadFolder))
            {
                context.Response.StatusCode = 500;
                await context.Response.WriteAsync("Upload folder is not configured.");
                return;
            }

            var uploadsFolder = Path.Combine(rootUploadFolder, $"User{userId}", $"Subject{subjectId}", fileCategory);
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
                FileName = fileName,
                FileExtension = fileExtension,
                FilePath = filePath,
                SubjectId = subjectId == "Unknown" ? (int?)null : int.Parse(subjectId),
                UserId = userId == "Unknown" ? (int?)null : int.Parse(userId),
                FileType = fileType,
                FileCategory = fileCategory,
                Length = file.Length,
                CreationTime = DateTime.UtcNow,
                FileInfo = fileInfo
            };

            db.Files.Add(fileModel);
            await db.SaveChangesAsync();

            await context.Response.WriteAsJsonAsync(fileModel); // Return the inserted record as JSON
        });
    }
}
