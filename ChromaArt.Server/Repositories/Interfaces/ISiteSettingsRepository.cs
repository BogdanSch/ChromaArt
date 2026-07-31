using ChromaArt.Server.Models;

namespace ChromaArt.Server.Repositories.Interfaces;
public interface ISiteSettingsRepository : IEntityWriter<SiteSetting>
{
    Task<SiteSetting[]> GetAllSocialsAsync();
    Task<SiteSetting[]> GetAllPrivacyRecordsAsync();
}
