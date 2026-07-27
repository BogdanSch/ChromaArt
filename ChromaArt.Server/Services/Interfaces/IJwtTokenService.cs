using ChromaArt.Server.Data;
using ChromaArt.Server.Models;

namespace ChromaArt.Server.Services.Interfaces;
public interface IJwtTokenService
{
    (string, DateTime) GenerateToken(AppUser user, IList<string> roles);
    (string, DateTime) GenerateRefreshToken(bool rememberUser);
    TokenObject CreateTokenObject(AppUser user, IList<string> roles, bool rememberUser);
    public void SetTokensInsideCookie(TokenObject token, HttpContext context);
}