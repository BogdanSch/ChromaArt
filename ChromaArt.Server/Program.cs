using ChromaArt.Server.Data;
using ChromaArt.Server.Extenssions;
using ChromaArt.Server.Helpers.Settings;
using ChromaArt.Server.Models;
using ChromaArt.Server.Repositories;
using ChromaArt.Server.Repositories.Interfaces;
using ChromaArt.Server.Services;
using ChromaArt.Server.Services.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Scalar.AspNetCore;

WebApplicationBuilder builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));
builder.Services.AddIdentity<AppUser, IdentityRole>()
    .AddEntityFrameworkStores<ApplicationDbContext>()
    .AddDefaultTokenProviders();
builder.Services.Configure<DataProtectionTokenProviderOptions>(options =>
{
    options.TokenLifespan = TimeSpan.FromHours(2);
});

IConfigurationSection jwtSettings = builder.Configuration.GetSection(nameof(JwtSettings));
builder.Services.ConfigureJwtAuthentication(jwtSettings);
builder.Services.AddFluentEmail(builder.Configuration);
builder.Services.AddAuthorization();
builder.Services.AddResponseCaching();
builder.Services.AddControllers();

// Add services to the container.
builder.Services.AddScoped<IInstagramService, InstagramService>();
builder.Services.AddScoped<ICloudinaryService, CloudinaryService>();
builder.Services.AddScoped<IJwtTokenService, JwtTokenService>();
builder.Services.AddScoped<IPricingCategoryRepository, PricingCategoryRepository>();
builder.Services.AddScoped<ISiteSettingsRepository, SiteSettingRepository>();
builder.Services.AddScoped<ISocialLinkRepository, SocialLinkRepository>();
builder.Services.AddScoped<IEmailService, EmailService>();
builder.Services.AddHttpClient<InstagramService>(httpClient =>
{
    httpClient.DefaultRequestHeaders.Add("Accept", "application/json");
});

builder.Services.Configure<ApifySettings>(builder.Configuration.GetSection(nameof(ApifySettings)));
builder.Services.Configure<CloudinarySettings>(builder.Configuration.GetSection(nameof(CloudinarySettings)));
builder.Services.Configure<JwtSettings>(jwtSettings);
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

IConfigurationSection frontendSettings = builder.Configuration.GetSection("FrontendSettings");
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
        {
            policy.WithOrigins(frontendSettings["BaseUrl"]!, "https://localhost:59755")
                .AllowAnyMethod()
                .AllowAnyHeader()
                .AllowCredentials();
        });
});

WebApplication app = builder.Build();

app.UseDefaultFiles();
app.MapStaticAssets();
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.MapScalarApiReference();
}
if(args.Length == 1 && args[0] == "seeddata")
{
    await Seed.SeedTablesAsync(app);
    await Seed.SeedUsersAndRolesAsync(app);
}

app.UseRouting();
app.UseForwardedHeaders();
app.UseHttpsRedirection();

app.UseCors();
app.UseResponseCaching();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();
app.MapFallbackToFile("/index.html");

app.Run();