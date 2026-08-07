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
                    StartingPrice = 5m,
                    PreviewUrl = DEFAULT_IMAGE_URL,
                    DisplayOrder = 0,
                    IsActive = true
                },
                new PricingCategory
                {
                    Id = 2,
                    Name = "Lineart",
                    Description = "Crisp, refined linework that captures the intricate details and anatomy of your character.",
                    StartingPrice = 6m,
                    PreviewUrl = DEFAULT_IMAGE_URL,
                    DisplayOrder = 1,
                    IsActive = true
                },
                new PricingCategory
                {
                    Id = 3,
                    Name = "Flat coloured",
                    Description = "Clean lineart filled with vibrant, solid colors to bring your design to life without complex shading.",
                    StartingPrice = 8m,
                    PreviewUrl = DEFAULT_IMAGE_URL,
                    DisplayOrder = 2,
                    IsActive = true
                },
                new PricingCategory
                {
                    Id = 4,
                    Name = "Fully Shaded",
                    Description = "Fully shaded and beautifully rendered artwork with dynamic depth, lighting, and rich textures.",
                    StartingPrice = 13m,
                    PreviewUrl = DEFAULT_IMAGE_URL,
                    DisplayOrder = 3,
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
                    Value = "https://www.instagram.com/itsnotenderart/",
                    Category = SettingCategory.SocialLink
                },
                new SiteSetting
                {
                    Id = 3,
                    Key = "PolicyImage_1",
                    Value = DEFAULT_IMAGE_URL,
                    Category = SettingCategory.PolicyImage
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