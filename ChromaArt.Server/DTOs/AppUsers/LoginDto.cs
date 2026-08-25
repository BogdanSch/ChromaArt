using System.ComponentModel.DataAnnotations;

namespace ChromaArt.Server.DTOs.AppUsers;
public record LoginDto([EmailAddress] string Email, string Password, bool RememberMe = false) {}