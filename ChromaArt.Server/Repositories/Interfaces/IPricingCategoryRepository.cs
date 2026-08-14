using ChromaArt.Server.Models;

namespace ChromaArt.Server.Repositories.Interfaces;

public interface IPricingCategoryRepository
{
    Task<PricingCategory[]> GetAllAsync();
}