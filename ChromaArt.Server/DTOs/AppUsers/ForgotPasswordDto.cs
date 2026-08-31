using System.ComponentModel.DataAnnotations;

namespace ChromaArt.Server.DTOs.AppUsers;
public record ForgotPasswordDto([Required][EmailAddress] string Email, [Required] string ClientUri) {}
