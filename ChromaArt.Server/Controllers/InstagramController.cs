using ChromaArt.Server.Services.Interfaces;
using ChromaArt.Server.Helpers;
using Microsoft.AspNetCore.Mvc;

namespace ChromaArt.Server.Controllers;

[ApiController]
[Route("api/instagram-posts")]
public class InstagramController(IInstagramService instagramService) : ControllerBase
{
    private readonly IInstagramService _instagramService = instagramService;
    private const int CACHING_DURATION_IN_SECONDS = 360;
    public const string[] HASH_TAGS = {"digitalart"};
    [HttpGet]
    [ResponseCache(Duration = CACHING_DURATION_IN_SECONDS, Location = ResponseCacheLocation.Any, VaryByQueryKeys = ["page"])]
    public async Task<IActionResult> Get(Query query)
    {
        PostDto[] posts = await _instagramService.GetPostsAsync();
        return Ok(_instagramService.FilterPosts(posts, HASH_TAGS));
    }
}
