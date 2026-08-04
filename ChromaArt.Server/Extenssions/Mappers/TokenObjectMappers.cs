using ChromaArt.Server.Data;
using ChromaArt.Server.DTOs.Token;
using ChromaArt.Server.Helpers;

namespace ChromaArt.Server.Extenssions.Mappers;

public static class TokenObjectMappers
{
    public static TokenDataDto ToTokenDataDto(this TokenObject tokenObject) => 
        new(DateHelper.GetDateTimeInStringFormat(tokenObject.AccessTokenExpirationTime),
            DateHelper.GetDateTimeInStringFormat(tokenObject.RefreshTokenExpirationTime));
}
