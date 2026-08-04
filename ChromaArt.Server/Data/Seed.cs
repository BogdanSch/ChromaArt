using ChromaArt.Server.Data.Enums;
using ChromaArt.Server.Models;
using Microsoft.AspNetCore.Identity;

namespace ChromaArt.Server.Data;

public class Seed
{
    public const string DEFAULT_IMAGE_URL = "https://placehold.co/600x400/EEE/31343C";
    public static async Task SeedTablesAsync(IApplicationBuilder applicationBuilder)
    {
        using IServiceScope serviceScope = applicationBuilder.ApplicationServices.CreateScope();
        ApplicationDbContext context = serviceScope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
        await context.Database.EnsureCreatedAsync();

        if (!context.PricingCategories.Any())
        {
            await context.PricingCategories.AddRangeAsync(
                new PricingCategory
                {
                    Id = 1,
                    Name = "Sketch",
                    Description = "A clean and expressive digital sketch of your character.",
                    StartingPrice = 4m,
                    PreviewUrl = DEFAULT_IMAGE_URL,
                    DisplayOrder = 0,
                    IsActive = true
                },
                new PricingCategory
                {
                    Id = 2,
                    Name = "Flat",
                    Description = "Clean lineart filled with vibrant, eye-catching flat colors.",
                    StartingPrice = 6m,
                    PreviewUrl = DEFAULT_IMAGE_URL,
                    DisplayOrder = 1,
                    IsActive = true
                },
                new PricingCategory
                {
                    Id = 3,
                    Name = "Shaded",
                    Description = "Fully shaded and beautifully rendered artwork with depth and lighting.",
                    StartingPrice = 10m,
                    PreviewUrl = DEFAULT_IMAGE_URL,
                    DisplayOrder = 2,
                    IsActive = true
                }
            );
        }
        if (!context.SiteSettings.Any())
        {
            await context.SiteSettings.AddRangeAsync(
                new SiteSetting
                {
                    Id = 1,
                    Key = "Social_Facebook",
                    Value = "https://facebook.com/chromaart",
                    Category = SettingCategory.SocialLink
                },
                new SiteSetting
                {
                    Id = 2,
                    Key = "Social_Instagram",
                    Value = "https://instagram.com/chrdotomaart",
                    Category = SettingCategory.SocialLink
                },
                new SiteSetting
                {
                    Id = 3,
                    Key = "Privacy_HeroImage",
                    Value = DEFAULT_IMAGE_URL,
                    Category = SettingCategory.PrivacyImage
                },
                new SiteSetting
                {
                    Id = 4,
                    Key = "Commission_Status",
                    Value = "Open",
                    Category = SettingCategory.CommissionInfo
                }
            );
        }

        if (context.ChangeTracker.HasChanges())
        {
            await context.SaveChangesAsync();
        }
    }
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
                UserName = "Admin",
                Email = adminUserEmail,
                EmailConfirmed = true,
                RegisteredAt = DateTime.UtcNow,
            };
            await userManager.CreateAsync(newAdminUser, "Coding@1234?");
            await userManager.AddToRoleAsync(newAdminUser, UserRoles.Admin);
        }
    }
}