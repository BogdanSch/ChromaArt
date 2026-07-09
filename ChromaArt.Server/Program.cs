using ChromaArt.Server.Helpers;
using ChromaArt.Server.Services;
using ChromaArt.Server.Services.Interfaces;
using Scalar.AspNetCore;

WebApplicationBuilder builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
// Add services to the container.
builder.Services.AddScoped<IInstagramService, InstagramService>();
builder.Services.AddHttpClient<InstagramService>(httpClient =>
{
    httpClient.BaseAddress = new Uri("https://api.apify.com/v2/");
    httpClient.DefaultRequestHeaders.Add("Accept", "application/json");
});
builder.Services.AddResponseCaching();

builder.Services.Configure<ApifySettings>(builder.Configuration.GetSection(nameof(ApifySettings)));

builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

WebApplication app = builder.Build();

app.UseDefaultFiles();
app.MapStaticAssets();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.MapScalarApiReference();
}

app.UseRouting();

app.UseForwardedHeaders();
app.UseHttpsRedirection();
app.UseAuthorization();

app.UseResponseCaching();

app.MapControllers();
app.MapFallbackToFile("/index.html");

app.Run();