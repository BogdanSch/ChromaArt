using Microsoft.EntityFrameworkCore;
using ChromaArt.Server.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace ChromaArt.Server.Data;
public class ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : IdentityDbContext<AppUser>(options)
{
    public DbSet<PricingCategory> PricingCategories => Set<PricingCategory>();
    public DbSet<SiteSetting> SiteSettings => Set<SiteSetting>();
    public DbSet<SocialLink> SocialLinks => Set<SocialLink>();
    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
    }
}
