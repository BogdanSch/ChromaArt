using System.ComponentModel.DataAnnotations;

namespace ChromaArt.Server.Models;
public class SiteSetting
{
    [Key]
    public required int Id { get; set; }
    [MaxLength(100, ErrorMessage = "Key cannot exceed 100 characters")]
    public required string Key { get; set; }
    public required string Value { get; set; }
}