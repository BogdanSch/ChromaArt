namespace JwtService.DTOs;

public record TokenDataDto(string AccessTokenExpirationTime, string RefreshTokenExpirationTime);