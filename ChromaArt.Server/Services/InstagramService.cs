using ChromaArt.Server.Dtos;
using ChromaArt.Server.Helpers;
using ChromaArt.Server.Mappers;
using ChromaArt.Server.Services.Interfaces;
using ForeverTools.Apify;
using ForeverTools.Apify.Constants;
using Microsoft.Extensions.Options;

namespace ChromaArt.Server.Services;

public class InstagramService(IOptions<ApifySettings> config) : IInstagramService
{
    private readonly ApifyClient _client = new(config.Value.Token);
    public async Task<PostDto[]> FilterPosts(PostDto[] posts, string[] hashtags)
    {
        return [..posts.Where(p => p.Hashtags.ContainsAny(hashtags))];
    }

    public async Task<PostDto[]> GetPostsAsync()
    {
        var results = await _client.ScrapeAsync<Dictionary<string, object>>(
            PopularActors.InstagramScraper, new
            {
                directUrls = new[]
                {
                    "https://www.instagram.com/itsnotenderart/"
                }
            });

        if (results.Count == 0)
            return [];
        return [.. results.Select(item => item.ToPostDto())];
    }
}
