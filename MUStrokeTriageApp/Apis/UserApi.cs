using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Routing;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading.Tasks;

public static class UserApi
{
    public static void Map(IEndpointRouteBuilder app)
    {
        var usersApi = app.MapGroup("/users");
        usersApi.MapGet("/", async (DataContext db) =>
        {
            try
            {
                return Results.Ok(await db.Set<UserModel>().ToListAsync());
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
        usersApi.MapGet("/{id}", async (string id, DataContext db) =>
        {
            try
            {
                var user = await db.Users.FindAsync(id);
                return user is not null ? Results.Ok(user) : Results.NotFound();
            }
            catch (Exception)
            {
                // Log exception
                return Results.Problem("An error occurred while retrieving the user.");
            }
            finally
            {
                await db.DisposeAsync();
            }
        });
        usersApi.MapPost("/", async (UserModel user, DataContext db) =>
        {
            try
            {
                var newuser = new UserModel
                {
                    Id = user.Id,
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    Name = user.Name,
                    Email = user.Email,
                    CreatedDate = DateTime.Now,
                    Role = user.Role,
                    // Map other properties as needed
                };
                db.Users.Add(newuser);
                await db.SaveChangesAsync();
                return Results.Created($"/users/{user.Id}", user);
            }
            catch (Exception)
            {
                // Log exception
                return Results.Problem("An error occurred while creating the user.");
            }
            finally
            {
                await db.DisposeAsync();
            }
        });
        usersApi.MapPut("/{id}", async (string id, UserModel updatedData, DataContext db) =>
        {
            try
            {
                var user = await db.Users.FindAsync(id);
                if (user is null) return Results.NotFound();

                // Update other properties as needed

                await db.SaveChangesAsync();
                return Results.NoContent();
            }
            catch (Exception)
            {
                // Log exception
                return Results.Problem("An error occurred while updating the user.");
            }
            finally
            {
                await db.DisposeAsync();
            }
        });
        usersApi.MapDelete("/{id}", async (string id, DataContext db) =>
        {
            try
            {
                var user = await db.Users.FindAsync(id);
                if (user is null) return Results.NotFound();

                db.Users.Remove(user);
                await db.SaveChangesAsync();
                return Results.NoContent();
            }
            catch (Exception)
            {
                // Log exception
                return Results.Problem("An error occurred while deleting the user.");
            }
            finally
            {
                await db.DisposeAsync();
            }
        });
    }
}
