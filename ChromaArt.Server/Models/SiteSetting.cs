using ChromaArt.Server.Data.Enums;
using ChromaArt.Server.DTOs.SiteSettings;
using System.ComponentModel.DataAnnotations;

namespace ChromaArt.Server.Models;
public class SiteSetting
{
    [Key]
    [Required]
    public int Id { get; set; }
    [MaxLength(100, ErrorMessage = "Key cannot exceed 100 characters")]
    public required string Key { get; set; }
    public required string Value { get; set; }
    public required SettingCategory Category { get; set; }
    public SiteSettingDto ToDto() =>
        new(Id, Key, Value, (int)Category);
}