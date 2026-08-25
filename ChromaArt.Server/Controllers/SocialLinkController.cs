using ChromaArt.Server.DTOs.SocialLinks;
using ChromaArt.Server.Helpers;
using ChromaArt.Server.Models;
using ChromaArt.Server.Repositories.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace ChromaArt.Server.Controllers;
[ApiController]
[Route("api/social-links")]
public class SocialLinkController(ISocialLinkRepository repo) : ControllerBase
{
    private readonly ISocialLinkRepository _repo = repo;
    [HttpGet]
    public async Task<IActionResult> GetSocialLinkDataAsync([FromQuery] Query query)
    {
        SocialLink[] results = await _repo.GetAllAsync(query);
        SocialLinkDto[] dtos = [.. results.Select(s => s.ToDto())];
        return Ok(dtos);
    }
}
