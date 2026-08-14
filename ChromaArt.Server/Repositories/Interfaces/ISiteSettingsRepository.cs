using ChromaArt.Server.Models;

namespace ChromaArt.Server.Repositories.Interfaces;
public interface ISiteSettingsRepository : IEntityWriter<SiteSetting>
{
    Task<SiteSetting[]> GetAllPolicyRecordsAsync();
    Task<SiteSetting[]> GetAllCommissionInfoAsync();
}
