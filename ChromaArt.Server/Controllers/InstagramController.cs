using ChromaArt.Server.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace ChromaArt.Server.Controllers;

[ApiController]
[Route("api/[controller]")]
public class InstagramController(IInstagramService instagramService) : ControllerBase
{
    private readonly IInstagramService _instagramService = instagramService;
    [HttpGet]
    public async Task<IActionResult> Get()
    {
        return Ok(await _instagramService.GetPostsAsync());
    }
}
