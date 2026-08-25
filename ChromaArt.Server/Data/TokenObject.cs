using ChromaArt.Server.DTOs.Token;
using ChromaArt.Server.Helpers;

namespace ChromaArt.Server.Data;
public record TokenObject(string AccessToken, DateTime AccessTokenExpirationTime,
    string RefreshToken, DateTime RefreshTokenExpirationTime) 
{
    public TokenDataDto ToTokenDataDto() =>
    new(DateHelper.GetDateTimeInStringFormat(this.AccessTokenExpirationTime),
        DateHelper.GetDateTimeInStringFormat(this.RefreshTokenExpirationTime));
}