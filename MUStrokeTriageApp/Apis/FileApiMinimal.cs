using Microsoft.AspNetCore.Mvc;

public static class FileApiMinimal
{
    private static readonly string _storagePath = Path.Combine(Directory.GetCurrentDirectory(), "UploadedFiles");

    public static void MapFileApiX(this IEndpointRouteBuilder app)
    {
        if (!Directory.Exists(_storagePath))
        {
            Directory.CreateDirectory(_storagePath);
        }

        app.MapPost("/api/files/upload", async ([FromForm] IFormFile file) =>
        {
            if (file == null || file.Length == 0)
                return Results.BadRequest("No file uploaded.");

            var filePath = Path.Combine(_storagePath, file.FileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            return Results.Ok(new { filePath });
        })
        .Accepts<IFormFile>("multipart/form-data")
        .Produces<object>(StatusCodes.Status200OK)
        .Produces(StatusCodes.Status400BadRequest)
        .WithTags("Files");

        app.MapGet("/api/files/download/{fileName}", async (string fileName) =>
        {
            var filePath = Path.Combine(_storagePath, fileName);

            if (!File.Exists(filePath))
                return Results.NotFound();

            var memory = new MemoryStream();
            using (var stream = new FileStream(filePath, FileMode.Open))
            {
                await stream.CopyToAsync(memory);
            }
            memory.Position = 0;

            return Results.File(memory.ToArray(), GetContentType(filePath), fileName);
        })
        .Produces<IResult>(StatusCodes.Status200OK)
        .Produces(StatusCodes.Status404NotFound)
        .WithTags("Files");
    }

    private static string GetContentType(string path)
    {
        var types = new Dictionary<string, string>
        {
            {".txt", "text/plain"},
            {".pdf", "application/pdf"},
            {".doc", "application/vnd.ms-word"},
            {".docx", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"},
            {".xls", "application/vnd.ms-excel"},
            {".xlsx", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"},
            {".png", "image/png"},
            {".jpg", "image/jpeg"},
            {".jpeg", "image/jpeg"},
            {".gif", "image/gif"},
            {".csv", "text/csv"}
        };

        var ext = Path.GetExtension(path).ToLowerInvariant();
        return types.ContainsKey(ext) ? types[ext] : "application/octet-stream";
    }
}