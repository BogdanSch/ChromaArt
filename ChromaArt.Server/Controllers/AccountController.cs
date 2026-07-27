using ChromaArt.Server.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using ChromaArt.Server.Models;
using ChromaArt.Server.DTOs.AppUsers;
using ChromaArt.Server.Mappers;
using ChromaArt.Server.Data;

namespace ChromaArt.Server.Controllers;

[ApiController]
[Route("api/accounts")]
public class AccountController(UserManager<AppUser> userManager, IJwtTokenService tokenService) : ControllerBase
{
    private readonly UserManager<AppUser> _userManager = userManager;
    private readonly IJwtTokenService _tokenService = tokenService;
    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
    {
        var user = await _userManager.FindByEmailAsync(loginDto.Email);
        if(user is null) 
            return Unauthorized();

        var result = await _userManager.CheckPasswordAsync(user, loginDto.Password);

        if (user is not null && await _userManager.CheckPasswordAsync(user, loginDto.Password))
        {
            IList<string> roles = await _userManager.GetRolesAsync(user);
            TokenObject token = _tokenService.CreateTokenObject(user, roles, loginDto.RememberMe);

            return Ok(token.ToTokenDataDto());
        }
        return Unauthorized();
    }
}
