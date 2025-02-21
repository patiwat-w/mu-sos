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
        uploadApi.MapPost("/upload", async context =>
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

            if (file == null)
            {
                context.Response.StatusCode = 400;
                await context.Response.WriteAsync("No file uploaded.");
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

            await context.Response.WriteAsync($"File uploaded successfully: {filePath}");
        });
    }
}
