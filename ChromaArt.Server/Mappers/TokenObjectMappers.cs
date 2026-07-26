using ChromaArt.Server.Helpers;
using JwtService.Data;
using JwtService.DTOs;

namespace ChromaArt.Server.Mappers;

public static class TokenObjectMappers
{
    public static TokenDataDto ToTokenDataDto(this TokenObject tokenObject) => 
        new(DateHelper.GetDateTimeInStringFormat(tokenObject.AccessTokenExpirationTime),
            DateHelper.GetDateTimeInStringFormat(tokenObject.RefreshTokenExpirationTime));
}
