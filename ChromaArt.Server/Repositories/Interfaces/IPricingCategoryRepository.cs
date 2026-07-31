using ChromaArt.Server.Models;

namespace ChromaArt.Server.Repositories.Interfaces;

public interface IPricingCategoryRepository : IEntityWriter<PricingCategory>
{
    Task<PricingCategory[]> GetAllAsync();
}