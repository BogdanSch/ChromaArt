using ChromaArt.Server.Services.Interfaces;
using ChromaArt.Server.Helpers;
using Microsoft.AspNetCore.Mvc;
using ChromaArt.Server.DTOs.Posts;

namespace ChromaArt.Server.Controllers;

[ApiController]
[Route("api/instagram-posts")]
public class InstagramController(IInstagramService instagramService) : ControllerBase
{
    private readonly IInstagramService _instagramService = instagramService;
    private const int CACHING_DURATION_IN_SECONDS = 360;
    public static readonly string[] HASHTAGS = { "digitalart" };
    [HttpGet]
    [ResponseCache(Duration = CACHING_DURATION_IN_SECONDS, Location = ResponseCacheLocation.Any, VaryByQueryKeys = ["page"])]
    public async Task<IActionResult> Get([FromQuery] Query query)
    {
        PostDto[] posts = await _instagramService.GetPostsAsync(query);
        posts = _instagramService.FilterPosts(posts, HASHTAGS);
        return Ok(posts);
    }
    [HttpGet("proxy-image")]
    [ResponseCache(Duration = CACHING_DURATION_IN_SECONDS, Location = ResponseCacheLocation.Any, VaryByQueryKeys = ["url"])]
    public async Task<IActionResult> ProxyImage([FromQuery] string url)
    {
        if (string.IsNullOrWhiteSpace(url))
            return BadRequest("URL is required.");

        (Stream, string)? file = await _instagramService.FetchImagesAsync(url);
        if(file is null)
            return BadRequest("Unable to fetch the image from the provided URL.");

        return File(file.Value.Item1, file.Value.Item2);
    }
}
