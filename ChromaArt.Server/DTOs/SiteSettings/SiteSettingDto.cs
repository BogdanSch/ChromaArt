namespace ChromaArt.Server.DTOs.SiteSettings;
public record SiteSettingDto(int Id, string Key, string Value, int Category = 0) {}
