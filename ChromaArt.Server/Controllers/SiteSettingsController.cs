using ChromaArt.Server.DTOs.SiteSettings;
using ChromaArt.Server.Extenssions.Mappers;
using ChromaArt.Server.Models;
using ChromaArt.Server.Repositories.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace ChromaArt.Server.Controllers;

[ApiController]
[Route("api/site-settings")]
public class SiteSettingsController(ISiteSettingsRepository siteSettingsRepository) : ControllerBase
{
    private readonly ISiteSettingsRepository _repo = siteSettingsRepository;
    [HttpGet("socials")]
    public async Task<IActionResult> GetSocialsAsync()
    {
        SiteSetting[] results = await _repo.GetAllSocialsAsync();
        SiteSettingDto[] dtos = [.. results.Select(s => s.ToDto())];
        return Ok(dtos);
    }
    [HttpGet("privacy")]
    public async Task<IActionResult> GetPrivacyRecordsAsync()
    {
        SiteSetting[] results = await _repo.GetAllPrivacyRecordsAsync();
        SiteSettingDto[] dtos = [.. results.Select(s => s.ToDto())];
        return Ok(dtos);
    }
    [HttpGet("commissions")]
    public async Task<IActionResult> GetCommissionsInfoAsync()
    {
        SiteSetting[] results = await _repo.GetAllCommissionInfoAsync();
        SiteSettingDto[] dtos = [.. results.Select(s => s.ToDto())];
        return Ok(dtos);
    }
}