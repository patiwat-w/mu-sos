using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Routing;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Linq;
using System.Threading.Tasks;

public static class UserAuthenticationMethodApi
{
    public static void Map(IEndpointRouteBuilder app)
    {
        var userAuthMethodsApi = app.MapGroup("/user-auth-methods");
        userAuthMethodsApi.MapGet("/", async (DataContext db, string? provider, string? providerKey, string? email) =>
        {
            try
            {
                var query = db.Set<UserAuthenticationMethodModel>().AsQueryable();

                if (!string.IsNullOrEmpty(provider))
                {
                    if (Enum.TryParse<AuthenticationProvider>(provider, true, out var parsedProvider))
                    {
                        query = query.Where(uam => uam.Provider == parsedProvider);
                    }
                }

                if (!string.IsNullOrEmpty(providerKey))
                {
                    query = query.Where(uam => uam.ProviderKey == providerKey);
                }

                if (!string.IsNullOrEmpty(email))
                {
                    query = query.Where(uam => uam.Email == email);
                }

                return Results.Ok(await query.ToListAsync());
            }
            catch (Exception ex)
            {
                // Log exception
                return Results.Problem("An error occurred while retrieving user authentication methods." + ex.Message);
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
            catch (Exception ex)
            {
                // Log exception
                return Results.Problem("An error occurred while retrieving the user authentication method." + ex.Message);
            }
            finally
            {
                await db.DisposeAsync();
            }
        });
        userAuthMethodsApi.MapPost("/", async (UserAuthenticationMethodModel userAuthMethod, DataContext db) =>
        {
            try
            {
                var existingUser = await db.Users.AsNoTracking().FirstOrDefaultAsync(u => u.Id == userAuthMethod.User.Id);
                if (existingUser != null)
                {
                    // Update existing user
                    existingUser.FirstName = userAuthMethod.User.FirstName;
                    existingUser.LastName = userAuthMethod.User.LastName;
                    existingUser.Name = userAuthMethod.User.Name;
                    existingUser.Email = userAuthMethod.User.Email;
                    existingUser.Role = userAuthMethod.User.Role;
                    // Update other properties as needed

                    // Attach the updated instance
                    db.Users.Attach(existingUser);
                    db.Entry(existingUser).State = EntityState.Modified;
                }
                else
                {
                    // Add new user
                    db.Users.Add(userAuthMethod.User);
                }

                // Save changes to get the UserId
                await db.SaveChangesAsync();

                // Get the UserId from the inserted or updated user
                var userId = userAuthMethod.User.Id;

                var newAuthenMethod = new UserAuthenticationMethodModel
                {
                    UserId = userId,
                    Provider = userAuthMethod.Provider,
                    ProviderKey = userAuthMethod.ProviderKey,
                    DisplayName = userAuthMethod.DisplayName,
                    Email = userAuthMethod.Email,
                    PhotoURL = userAuthMethod.PhotoURL
                };
                db.UserAuthenticationMethods.Add(newAuthenMethod);
                await db.SaveChangesAsync();
                return Results.Created($"/user-auth-methods/{newAuthenMethod.Id}", newAuthenMethod);
            }
            catch (Exception ex)
            {
                // Log exception
                return Results.Problem("An error occurred while creating the user authentication method.", ex.Message);
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
            catch (Exception ex)
            {
                // Log exception
                return Results.Problem("An error occurred while updating the user authentication method." + ex.Message);
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
            catch (Exception ex)
            {
                // Log exception
                return Results.Problem("An error occurred while deleting the user authentication method." + ex.Message);
            }
            finally
            {
                await db.DisposeAsync();
            }
        });
    }
}
