using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using ChromaArt.Server.Models;

namespace ChromaArt.Server.Data;

public class Seed
{
    public const string DEFAULT_IMAGE_URL = "https://placehold.co/600x400/EEE/31343C";
    public static async Task SeedUsersAndRolesAsync(IApplicationBuilder applicationBuilder)
    {
        using IServiceScope serviceScope = applicationBuilder.ApplicationServices.CreateScope();

        // Roles
        RoleManager<IdentityRole> roleManager = serviceScope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole>>();
        if (!await roleManager.RoleExistsAsync(UserRoles.Admin))
            await roleManager.CreateAsync(new IdentityRole(UserRoles.Admin));

        // Users
        UserManager<AppUser> userManager = serviceScope.ServiceProvider.GetRequiredService<UserManager<AppUser>>();

        string adminUserEmail = "bogsvity777@gmail.com";
        AppUser? adminUser = await userManager.FindByEmailAsync(adminUserEmail);
        if (adminUser is null)
        {
            AppUser newAdminUser = new()
            {
                UserName = "Bohdan",
                Email = adminUserEmail,
                EmailConfirmed = true,
                RegisteredAt = DateTime.UtcNow,
                Address = new Address()
            };
            await userManager.CreateAsync(newAdminUser, "Coding@1234?");
            await userManager.AddToRoleAsync(newAdminUser, UserRoles.Admin);
        }
    }
}