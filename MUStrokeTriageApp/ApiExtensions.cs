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
}
