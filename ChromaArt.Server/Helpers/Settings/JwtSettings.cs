namespace ChromaArt.Server.Helpers.Settings;
public class JwtSettings
{
    public required string Issuer { get; set; }
    public required string Audience { get; set; }
    public required int AccessTokenExpirationTimeInMinutes { get; set; }
    public required int RefreshTokenExpirationTimeInDays { get; set; }
    public required string SecretKey { get; set; }
}
