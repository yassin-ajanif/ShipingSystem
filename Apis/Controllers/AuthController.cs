using Apis.Models;
using Azure;
using Azure.Core;
using BusinessAccessLayer.DTOs;
using BusinessAccessLayer.Interfaces;
using BusinessAccessLayer.Services;
using Domains;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ApiExplorer;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;

namespace Apis.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {

        private readonly TokenService _tokenService;
        private readonly IUserService _userService;
        private readonly IRefreshTokenService _RefreshTokenService;
        public AuthController(TokenService tokenService,
                              IUserService userService,
                              IRefreshTokenService refreshTokenService)
        {
            _tokenService = tokenService;
            _userService = userService;
            _RefreshTokenService = refreshTokenService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] UserDto request)
        {
            try
            {
                var result = await _userService.RegisterAsync(request);

                if (!result.Success)
                {
                    return BadRequest(ApiResponse<UserResultDto>.
                        FailResponse("User registration failed", result.Errors?.ToList()));
                }

                return Ok(ApiResponse<UserResultDto>.
                SuccessResponse(result, "User registered successfully"));
            }
            catch (Exception ex)
            {
                return StatusCode(500, ApiResponse<UserResultDto>.
                    FailResponse("An unexpected error occurred while registering the user", new List<string> { ex.Message }));
            }
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto request)
        {
            try
            {
                var userResult = await _userService.LoginAsync(request);
                if (!userResult.Success)
                {
                    return Unauthorized(ApiResponse<UserResultDto>.FailResponse("Invalid credentials"));
                }

        
                var userData = await GetClims(request.Email);
                var claims = userData.Item1;
                UserDto user = userData.Item2;
                var accessToken = _tokenService.GenerateAccessToken(claims);
                var refreshToken = _tokenService.GenerateRefreshToken();

                var storedToken = new RefreshTokenDto
                {
                    Token = refreshToken,
                    UserId = user.Id.ToString(),
                    Expires = DateTime.UtcNow.AddDays(7),
                    CurrentState = 1
                };

               await _RefreshTokenService.RefreshToken(storedToken);

                Response.Cookies.Append("RefreshToken", refreshToken, new CookieOptions
                {
                    HttpOnly = true,
                    Secure = true,
                    Expires = storedToken.Expires
                });

                var responseDto = new UserResultDto
                {
                    Success = true,
                    accessToken = accessToken,
                    refreshToken = refreshToken,
                    FirstName = user.FirstName
                };

                return Ok(ApiResponse<UserResultDto>.SuccessResponse(
                    responseDto,
                    "Tokens retrieved successfully"
                ));
            }
            catch (Exception ex)
            {
                return StatusCode(500, ApiResponse<UserResultDto>.FailResponse(
                    "An unexpected error occurred while logging in",
                    new List<string> { ex.Message }));
            }
        }


        [HttpPost("refresh-access-token")]
        public async Task<IActionResult> RefreshAccessToken()
        {

            if (!Request.Cookies.TryGetValue("RefreshToken", out var refreshToken))
            {
                return Unauthorized("No refresh token found");
            }
            var test = _userService.GetLoggedInUser();
            // Retrieve the refresh token from the database
            var storedToken = await _RefreshTokenService.GetByToken(refreshToken);
            if (storedToken == null || storedToken.CurrentState == 2 || storedToken.Expires < DateTime.UtcNow)
            {
                return Unauthorized("Invalid or expired refresh token");
            }

            // Generate a new access token
            var claims = await GetClimsById(storedToken.UserId);

            var newAccessToken = _tokenService.GenerateAccessToken(claims);

            return Ok(ApiResponse<string>.SuccessResponse
                (newAccessToken,"Access Token retrieved successfully"));
        }

        [HttpPost("refresh")]
        [Authorize]
        public async Task<IActionResult> Refresh()
        {
            if (!Request.Cookies.TryGetValue("RefreshToken", out var refreshToken))
            {
                return Unauthorized("No refresh token found");
            }
       
            // Retrieve the refresh token from the database
            var storedToken = await _RefreshTokenService.GetByToken(refreshToken);
            if (storedToken == null || storedToken.CurrentState == 2 || storedToken.Expires < DateTime.UtcNow)
            {
                return Unauthorized("Invalid or expired refresh token");
            }

            // Generate a new refresh token
            var newRefreshToken = _tokenService.GenerateRefreshToken();
            var newRefreshDto = new RefreshTokenDto
            {
                Token = newRefreshToken,
                UserId = storedToken.Id.ToString(),
                Expires = DateTime.UtcNow.AddDays(7),
                CurrentState = 1
            };
            await _RefreshTokenService.RefreshToken(newRefreshDto);

            // Set the new refresh token in the cookies
            Response.Cookies.Append("RefreshToken", newRefreshToken, new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                Expires = DateTime.UtcNow.AddDays(7)
            });
 
            return Ok(ApiResponse<string>.SuccessResponse
                (newRefreshToken, "Access Token refreshed successfully"));
        }


        async Task<(Claim[], UserDto)> GetClims(string email)
        {
            var user = await _userService.GetUserByEmailAsync(email);
            var claims = new[] {
                new Claim(ClaimTypes.Name, user.Email),
                new Claim(ClaimTypes.Role, "User")
            };

            return (claims, user);
        }

        async Task<Claim[]> GetClimsById(string userId)
        {
            var user = await _userService.GetUserByIdAsync(userId);

            var claims = new[] {
                new Claim(ClaimTypes.Name, user.Email),
                new Claim(ClaimTypes.Role, "User")
            };

            return claims;
        }
    }
}
