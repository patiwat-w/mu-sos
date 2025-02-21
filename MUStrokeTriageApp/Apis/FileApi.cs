using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using Microsoft.EntityFrameworkCore;
using System;
using System.IO;
using System.Threading.Tasks;

public static class FileApi
{
    public static void Map(IEndpointRouteBuilder app)
    {
        var uploadApi = app.MapGroup("/file");
        
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

            var filePath = Path.Combine("Uploads", file.FileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            await context.Response.WriteAsync($"File uploaded successfully: {filePath}");
        });
    }
}
