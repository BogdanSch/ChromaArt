using ChromaArt.Server.Data;
using ChromaArt.Server.Data.Enums;
using ChromaArt.Server.Models;
using ChromaArt.Server.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace ChromaArt.Server.Repositories;

public class SiteSettingsRepository(ApplicationDbContext context) : ISiteSettingsRepository
{
    private readonly ApplicationDbContext _context = context;
    public async Task<bool> AddAsync(SiteSetting item)
    {
        await _context.SiteSettings.AddAsync(item);
        return await SaveAsync();
    }
    public async Task<bool> DeleteAsync(SiteSetting item)
    {
        int result = await _context.SiteSettings.Where(ss => ss.Id.Equals(item.Id)).ExecuteDeleteAsync();
        return result > 0;
    }
    public async Task<bool> UpdateAsync(SiteSetting item)
    {
        _context.Update(item);
        return await SaveAsync();
    }
    private IQueryable<SiteSetting> GetSiteSettingsByType(SiteSettingType type) => _context.SiteSettings.Where(ss => ss.Type == type);
    public async Task<SiteSetting[]> GetAllSocialsAsync()
    {
        return await GetSiteSettingsByType(SiteSettingType.Social).ToArrayAsync();
    }
    public async Task<SiteSetting[]> GetAllPrivacyRecordsAsync()
    {
        return await GetSiteSettingsByType(SiteSettingType.Privacy).ToArrayAsync();
    }
    public async Task<bool> SaveAsync()
    {
        int result = await _context.SaveChangesAsync();
        return result > 0;
    }
}
