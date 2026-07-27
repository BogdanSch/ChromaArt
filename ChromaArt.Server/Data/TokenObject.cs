namespace ChromaArt.Server.Data;

public record TokenObject(string AccessToken, DateTime AccessTokenExpirationTime,
    string RefreshToken, DateTime RefreshTokenExpirationTime) { }