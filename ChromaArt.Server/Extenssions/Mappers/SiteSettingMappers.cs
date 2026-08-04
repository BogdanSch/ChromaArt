using ChromaArt.Server.DTOs.SiteSettings;
using ChromaArt.Server.Models;

namespace ChromaArt.Server.Extenssions.Mappers;

public static class SiteSettingMappers
{
    public static SiteSettingDto ToDto(this SiteSetting model) => 
        new(model.Id, model.Key, model.Value, (int)model.Category);
}
