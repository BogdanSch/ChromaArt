using System.ComponentModel.DataAnnotations;

namespace ChromaArt.Server.DTOs.AppUsers;
public record ResetPasswordDto
{
    [Required]
    public required string Password {  get; init; }
    [Required] 
    [Compare(nameof(Password), ErrorMessage = "The password and confirmation password don't match.")]
    public required string ConfirmPassword { get; init; }
    [Required] 
    public required string Email { get; init; }
    [Required] 
    public required string Token { get; init; }
}
