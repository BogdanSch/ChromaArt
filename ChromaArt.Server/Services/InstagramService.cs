using ChromaArt.Server.DTOs;
using ChromaArt.Server.Helpers;
using ChromaArt.Server.Helpers.Settings;
using ChromaArt.Server.Services.Interfaces;
using Microsoft.Extensions.Options;
using System.Net.Mime;
using System.Text;

namespace ChromaArt.Server.Services;
public class InstagramService : IInstagramService
{
    private readonly HttpClient _client;
    private readonly IOptions<ApifySettings> _apifySettings;
    private readonly ILogger<InstagramService> _logger;
    private readonly ICloudinaryService _cloudinaryService;
    public const int ITEMS_PER_PAGE = 20;
    public InstagramService(IOptions<ApifySettings> config, HttpClient client, ILogger<InstagramService> logger, ICloudinaryService cloudinaryService)
    {
        _client = client;
        _client.BaseAddress = new Uri("https://api.apify.com/v2/");
        _apifySettings = config;
        _logger = logger;
        _cloudinaryService = cloudinaryService;
    }
    
    public PostDto[] FilterPosts(PostDto[] posts, string[] hashtags)
    {
        return [..posts.Where(p => p.Hashtags.ContainsAny(hashtags))];
    }
    public async Task<PostDto[]> GetPostsAsync(Query query)
    {
        try 
        {
            StringBuilder url = new("actor-tasks/bogsvity777~instagram-scraper-arts-task/runs/last/dataset/items?token=");
            url.Append(_apifySettings.Value.Token);
            if (query.Page is not null) 
            {
                int offset = query.Page.GetValueOrDefault(1) * ITEMS_PER_PAGE;
                url.Append($"&limit={ITEMS_PER_PAGE}&offset={offset}");
            }
         
            var response = await _client.GetAsync(url.ToString()); 
            response.EnsureSuccessStatusCode();
            
            PostDto[]? results = await response.Content.ReadFromJsonAsync<PostDto[]>();
            if(results is null)
            {
                _logger.LogWarning("No posts found");
                return [];
            }
            return results;
        }
        catch(Exception ex)
        {
            _logger.LogError(ex, "Couldn't fetch the posts");
            return [];
        }
    }
    public async Task<(Stream, string)?> FetchImagesAsync(string url)
    {
        try
        {
            var response = await _client.GetAsync(url);
            response.EnsureSuccessStatusCode();

            Stream stream = await response.Content.ReadAsStreamAsync();
            string contentType = response.Content.Headers.ContentType?.ToString() ?? "image/jpeg";

            return (stream, contentType);
        } 
        catch(Exception ex)
        {
            _logger.LogError(ex, "Failed to fetch image from Instagram.");
            return null;
        }
    }
}
