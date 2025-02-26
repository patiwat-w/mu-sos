using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

public static class ApiExtensions
{
    public static void MapTodoApi(this IEndpointRouteBuilder app)
    {
        TodoApi.Map(app);
    }

    public static void MapSubjectApi(this IEndpointRouteBuilder app)
    {
        var logger = app.ServiceProvider.GetRequiredService<ILogger<Program>>();
        SubjectApi.Map(app, logger);
    }

    public static void MapUserApi(this IEndpointRouteBuilder app)
    {
        UserApi.Map(app);
    }

    public static void MapUserAuthenticationMethodApi(this IEndpointRouteBuilder app)
    {
        UserAuthenticationMethodApi.Map(app);
    }

    // FileApi
    public static void MapFileApi(this IEndpointRouteBuilder app)
    {
        FileApi.Map(app);
    }

    // SubjectHealthInfoApi
    public static void MapSubjectHealthInfoApi(this IEndpointRouteBuilder app)
    {
        var logger = app.ServiceProvider.GetRequiredService<ILogger<Program>>();
        SubjectHealthInfoApi.Map(app, logger);
    }
}
