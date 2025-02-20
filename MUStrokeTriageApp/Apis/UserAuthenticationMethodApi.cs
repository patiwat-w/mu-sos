using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Routing;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading.Tasks;

public static class UserAuthenticationMethodAPI
{
    public static void Map(IEndpointRouteBuilder app)
    {
        var userAuthMethodsApi = app.MapGroup("/user-auth-methods");
        userAuthMethodsApi.MapGet("/", async (DataContext db) =>
        {
            try
            {
                return Results.Ok(await db.Set<UserAuthenticationMethodModel>().ToListAsync());
            }
            catch (Exception)
            {
                // Log exception
                return Results.Problem("An error occurred while retrieving user authentication methods .");
            }
            finally
            {
                await db.DisposeAsync();
            }
        });
        userAuthMethodsApi.MapGet("/{id}", async (string id, DataContext db) =>
        {
            try
            {
                var userAuthenticationMethod = await db.UserAuthenticationMethods.FindAsync(id);
                return userAuthenticationMethod is not null ? Results.Ok(userAuthenticationMethod) : Results.NotFound();
            }
            catch (Exception)
            {
                // Log exception
                return Results.Problem("An error occurred while retrieving the user authentication method.");
            }
            finally
            {
                await db.DisposeAsync();
            }
        });
        userAuthMethodsApi.MapPost("/", async (UserAuthenticationMethodModel  userAuthMethod, DataContext db) =>
        {
            try
            {
                var newAuthenMethod = new UserAuthenticationMethodModel
                {
                   

                };
                db.UserAuthenticationMethods.Add(newAuthenMethod);
                await db.SaveChangesAsync();
                return Results.Created($"/user-auth-methods/{ userAuthMethod.Id}",  userAuthMethod);
            }
            catch (Exception)
            {
                // Log exception
                return Results.Problem("An error occurred while creating the user authentication method.");
            }
            finally
            {
                await db.DisposeAsync();
            }
        });
        userAuthMethodsApi.MapPut("/{id}", async (string id, UserAuthenticationMethodModel updatedData, DataContext db) =>
        {
            try
            {
                var userAuthenticationMethod = await db.UserAuthenticationMethods.FindAsync(id);
                if (userAuthenticationMethod is null) return Results.NotFound();

                // Update other properties as needed

                await db.SaveChangesAsync();
                return Results.NoContent();
            }
            catch (Exception)
            {
                // Log exception
                return Results.Problem("An error occurred while updating the user authentication method.");
            }
            finally
            {
                await db.DisposeAsync();
            }
        });
        userAuthMethodsApi.MapDelete("/{id}", async (string id, DataContext db) =>
        {
            try
            {
                var userAuthenticationMethod = await db.UserAuthenticationMethods.FindAsync(id);
                if (userAuthenticationMethod is null) return Results.NotFound();

                db.UserAuthenticationMethods.Remove(userAuthenticationMethod);
                await db.SaveChangesAsync();
                return Results.NoContent();
            }
            catch (Exception)
            {
                // Log exception
                return Results.Problem("An error occurred while deleting the user authentication method.");
            }
            finally
            {
                await db.DisposeAsync();
            }
        });
    }
}
