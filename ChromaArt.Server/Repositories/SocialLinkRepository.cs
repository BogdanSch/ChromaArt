using ChromaArt.Server.Data;
using ChromaArt.Server.Helpers;
using ChromaArt.Server.Models;
using ChromaArt.Server.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace ChromaArt.Server.Repositories;
public class SocialLinkRepository(ApplicationDbContext context) : ISocialLinkRepository
{
    private readonly ApplicationDbContext _context = context;
    public async Task<bool> AddAsync(SocialLink item)
    {
        await _context.SocialLinks.AddAsync(item);
        return await SaveAsync();
    }
    public async Task<bool> DeleteAsync(SocialLink item)
    {
        int result = await _context.SocialLinks.Where(sl => sl.Id.Equals(item.Id)).ExecuteDeleteAsync();
        return result > 0;
    }
    public async Task<bool> UpdateAsync(SocialLink item)
    {
        _context.Update(item);
        return await SaveAsync();
    }
    public async Task<bool> SaveAsync()
    {
        int result = await _context.SaveChangesAsync();
        return result > 0;
    }
    public async Task<SocialLink[]> GetAllAsync(Query query)
    {
        IQueryable<SocialLink> socialLinks = _context.SocialLinks.AsQueryable();
        if(!string.IsNullOrWhiteSpace(query.Search))
        {
            string pattern = $"%{query.Search}%";
            socialLinks = socialLinks.Where(s => EF.Functions.Like(s.PlatformName.ToLower(), pattern));
        }

        return await socialLinks.ToArrayAsync();
    }
}
