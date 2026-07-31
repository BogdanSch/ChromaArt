using ChromaArt.Server.Data;
using ChromaArt.Server.Models;
using ChromaArt.Server.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace ChromaArt.Server.Repositories;
public class PricingCategoryRepository(ApplicationDbContext context) : IPricingCategoryRepository
{
    private readonly ApplicationDbContext _context = context;
    public async Task<bool> AddAsync(PricingCategory item)
    {
        await _context.PricingCategories.AddAsync(item);
        return await SaveAsync();
    }
    public async Task<bool> DeleteAsync(PricingCategory item)
    {
        int result = await _context.PricingCategories.Where(pc => pc.Id.Equals(item.Id)).ExecuteDeleteAsync();
        return result > 0;
    }
    public async Task<bool> UpdateAsync(PricingCategory item)
    {
        _context.Update(item);
        return await SaveAsync();
    }
    public async Task<bool> SaveAsync()
    {
        int result = await _context.SaveChangesAsync();
        return result > 0;
    }
    public async Task<PricingCategory[]> GetAllAsync()
    {
        return await _context.PricingCategories.ToArrayAsync();
    }
}
