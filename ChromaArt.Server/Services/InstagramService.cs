using System.Text;
using ChromaArt.Server.DTOs;
using ChromaArt.Server.Helpers;
using ChromaArt.Server.Helpers.Settings;
using ChromaArt.Server.Services.Interfaces;
using Microsoft.Extensions.Options;

namespace ChromaArt.Server.Services;

public class InstagramService(IOptions<ApifySettings> config, HttpClient client, ILogger<InstagramService> logger) : IInstagramService
{
    private readonly HttpClient _client = client;
    private readonly IOptions<ApifySettings> _apifySettings = config;
    private readonly ILogger<InstagramService> _logger = logger;
    public const int ITEMS_PER_PAGE = 25;
    
    public async Task<PostDto[]> FilterPosts(PostDto[] posts, string[] hashtags)
    {
        return [..posts.Where(p => p.Hashtags.ContainsAny(hashtags))];
    }
    public async Task<PostDto[]> GetPostsAsync(Query query)
    {
        try 
        {
            StringBuilder url = new($"actor-tasks/bogsvity777~instagram-scraper-arts-task/runs/last/dataset/items?token={_apifySettings.Value.Token}");
            if(query.Page is not null) 
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
}
