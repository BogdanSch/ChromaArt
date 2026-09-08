using System.ComponentModel.DataAnnotations;

namespace ChromaArt.Server.DTOs.AppUsers;
public record LoginDto([EmailAddress] string Email, [DataType(DataType.Password)] string Password, bool RememberMe = false) {}