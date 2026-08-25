using ChromaArt.Server.Data;
using ChromaArt.Server.DTOs.AppUsers;
using ChromaArt.Server.Models;
using ChromaArt.Server.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace ChromaArt.Server.Controllers;
[ApiController]
[Route("api/accounts")]
public class AccountController(UserManager<AppUser> userManager, IJwtTokenService tokenService) : ControllerBase
{
    private readonly UserManager<AppUser> _userManager = userManager;
    private readonly IJwtTokenService _tokenService = tokenService;
    private async Task<IActionResult> IssueTokenAndReturnResponseAsync(AppUser user, bool rememberUser = true)
    {
        IList<string> roles = await _userManager.GetRolesAsync(user);
        TokenObject token = _tokenService.CreateTokenObject(user, roles, rememberUser);

        user.RefreshToken = token.RefreshToken;
        user.RefreshTokenExpiresAtUtc = token.RefreshTokenExpirationTime;
        await _userManager.UpdateAsync(user);

        _tokenService.SetTokensInsideCookie(token, HttpContext);

        return Ok(token.ToTokenDataDto());
    }
    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
    {
        if(!ModelState.IsValid) 
            return BadRequest(ModelState);

        AppUser? user = await _userManager.FindByEmailAsync(loginDto.Email);
        if(user is null) 
            return Unauthorized();

        bool result = await _userManager.CheckPasswordAsync(user, loginDto.Password);
        if (user is not null && result)
        {
            return await IssueTokenAndReturnResponseAsync(user, loginDto.RememberMe);
        }
        return Unauthorized();
    }
    private async Task<AppUser?> GetUserByRefreshTokenAsync(string refreshToken)
    {
        if (string.IsNullOrWhiteSpace(refreshToken)) return null;
        return await _userManager.Users.FirstOrDefaultAsync(user => user.RefreshToken == refreshToken);
    }
    [HttpPost("refresh")]
    public async Task<IActionResult> RefreshToken()
    {
        HttpContext.Request.Cookies.TryGetValue("refreshToken", out var refreshToken);
        if (string.IsNullOrWhiteSpace(refreshToken))
            return Unauthorized("The refresh token was empty");

        AppUser? user = await GetUserByRefreshTokenAsync(refreshToken);
        if (user is null)
            return Unauthorized("Invalid refresh token");
        if (user.RefreshTokenExpiresAtUtc < DateTime.UtcNow)
            return Unauthorized("Refresh token has already expired");
        return await IssueTokenAndReturnResponseAsync(user);
    }
    [HttpGet("me")]
    [Authorize]
    public async Task<IActionResult> GetUserInfo()
    {
        string? email = User.FindFirst(ClaimTypes.Email)?.Value;
        if (string.IsNullOrWhiteSpace(email))
            return Unauthorized("Invalid user confirmation token");

        AppUser? appUser = await _userManager.FindByEmailAsync(email);
        if (appUser is null)
            return Unauthorized(new { message = "User was not found" });

        UserDto userDto = appUser.ToDto(await _userManager.IsInRoleAsync(appUser, UserRoles.Admin));
        return Ok(userDto);
    }
    public async Task<IActionResult> ResetPassword()
    {

    }
}
