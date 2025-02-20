using Microsoft.EntityFrameworkCore;

public static class ApiExtensions
{
    public static void MapTodoApi(this IEndpointRouteBuilder app)
    {
        TodoApi.Map(app);
    }

    public static void MapSubjectApi(this IEndpointRouteBuilder app)
    {
        SubjectApi.Map(app);
    }

    public static void MapUserApi(this IEndpointRouteBuilder app)
    {
        UserApi.Map(app);
    }

    public static void MapUserAuthenticationMethodApi(this IEndpointRouteBuilder app)
    {
        UserAuthenticationMethodApi.Map(app);
    }
}
