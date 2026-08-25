using ChromaArt.Server.DTOs.PricingCategories;
using ChromaArt.Server.Models;
using ChromaArt.Server.Repositories.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace ChromaArt.Server.Controllers;
[ApiController]
[Route("api/pricing-categories")]
public class PricingCategoryController(IPricingCategoryRepository pricingCategoryRepository) : ControllerBase
{
    private readonly IPricingCategoryRepository _repo = pricingCategoryRepository;
    [HttpGet]
    public async Task<IActionResult> GetAllAsync()
    {
        PricingCategory[] results = await _repo.GetAllAsync();
        PricingCategoryDto[] dtos = [.. results.Select(p => p.ToDto())];
        return Ok(dtos);
    }
}
