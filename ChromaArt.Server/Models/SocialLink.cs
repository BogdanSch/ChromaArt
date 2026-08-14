using System.ComponentModel.DataAnnotations;

namespace ChromaArt.Server.Models;
public class SocialLink
{
    [Key]
    [Required]
    public int Id { get; set; }
    [MinLength(4, ErrorMessage = "The Platform name must be at least 4 characters long")]
    public required string PlatformName { get; set; }
    [StringLength(200, MinimumLength = 4, ErrorMessage = "The Url must be between 4 and 200 characters")]
    public required string Url { get; set; }
}
