using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace ChromaArt.Server.Models;
public class AppUser : IdentityUser
{
    [StringLength(512, ErrorMessage = "Refresh token must be at most 512 characters long")]
    public string? RefreshToken { get; set; }
    public DateTime? RefreshTokenExpiresAtUtc { get; set; }
    public required DateTime RegisteredAt { get; set; } = DateTime.UtcNow;
}