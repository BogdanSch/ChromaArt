namespace ChromaArt.Server.DTOs.AppUsers;
public record LoginDto(string Email, string Password, bool RememberMe = false) {}