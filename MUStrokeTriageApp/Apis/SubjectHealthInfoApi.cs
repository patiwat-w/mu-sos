using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;


public static class SubjectHealthInfoApi {
    public static void MapSubjectHealthInfoApi(this IEndpointRouteBuilder routes) {
        var group = routes.MapGroup("/api/subjecthealthinfo");

        group.MapGet("/", () => {
            var defaultHealthInfo = new SubjectHealthInfoModel();
            return Results.Ok(defaultHealthInfo);
        })
        .WithName("GetDefaultSubjectHealthInfo");

        group.MapPost("/", (SubjectHealthInfoModel healthInfo) => {
            // Here you would typically save the healthInfo to a database
            return Results.Created($"/api/subjecthealthinfo/{healthInfo.Id}", healthInfo);
        })
        .WithName("CreateSubjectHealthInfo");
    }
}
