using ChromaArt.Server.Dtos;
using ChromaArt.Server.Helpers;
using ChromaArt.Server.Mappers;
using ChromaArt.Server.Services.Interfaces;
using ForeverTools.Apify;
using ForeverTools.Apify.Constants;
using Microsoft.Extensions.Options;

namespace ChromaArt.Server.Services;

public class InstagramService(IOptions<ApifySettings> config, HttpClient client, ILogger<InstagramService> logger) : IInstagramService
{
    private readonly HttpClient _client = client;
    private readonly IOption _apifySettings = config;
    public const int ITEMS_PER_PAGE = 26;
    
    public async Task<PostDto[]> FilterPosts(PostDto[] posts, string[] hashtags)
    {
        return [..posts.Where(p => p.Hashtags.ContainsAny(hashtags))];
    }
    public async Task<PostDto[]> GetPostsAsync(Query query)
    {
        try 
        {
            StringBuilder url = new($"actor-tasks/bogsvity777~instagram-scraper-arts-task/runs/last/dataset/items?token={_apifySettings.Value.Token}");
            
            if(!string.IsNullOrWhitespace(query.Page)) 
            {
                int offset = query.Page * ITEMS_PER_PAGE;
                url.Append($"&limit={ITEMS_PER_PAGE}&offset={offset}");
            }
            
            var response = await _client.GetAsync(); 
            response.EnsureSuccessStatusCode();
            
            PostDto[] results = await response.Content.ReadFromJsonAsync<PostDto[]>();
            return results;
        }
        catch(Exception ex)
        {
            _logger.LogError(ex, "Couldn't fetch the posts");
            return [];
        }
    }
}
