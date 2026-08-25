namespace ChromaArt.Server.DTOs.AppUsers;
public record UserDto(string Email, string UserName, string? PhoneNumber, string RegisteredAt, bool IsAdmin) { }