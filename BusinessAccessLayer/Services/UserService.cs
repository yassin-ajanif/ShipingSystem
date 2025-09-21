using BusinessAccessLayer.DTOs;
using BusinessAccessLayer.Interfaces;
using DataAccessLayer;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace BusinessAccessLayer.Services
{
    public class UserService : IUserService
    {
        private readonly UserManager<applicationUser> _userManager;
        private readonly SignInManager<applicationUser> _signInManager;
        private readonly IHttpContextAccessor _httpContextAcessor;

        public UserService(
            UserManager<applicationUser> userManager, 
            SignInManager<applicationUser> signInManager,
            IHttpContextAccessor httpContextAccessor)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _httpContextAcessor = httpContextAccessor;
        }
        public Task<IEnumerable<UserDto>> GetAllUsersAsync()
        {
            throw new NotImplementedException();
        }

        public  Guid GetLoggedInUser()
        {
            var userId =  _httpContextAcessor.HttpContext?.User?.FindFirstValue(ClaimTypes.NameIdentifier);
            return   Guid.Parse(userId);
        }

        public async Task<UserDto> GetUserByEmailAsync(string email)
        {
            var user = await _userManager.FindByEmailAsync(email);
            if (user == null) return null;

            var roles = await _userManager.GetRolesAsync(user);

            return new UserDto
            {
                Id = Guid.Parse(user.Id),
                Email = user.Email,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Phone = user.Phone,
                Role = roles.FirstOrDefault()
            };
        }

        public async Task<UserDto> GetUserByIdAsync(string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null) return null;

            var roles = await _userManager.GetRolesAsync(user);

            return new UserDto
            {
                Id = Guid.Parse(user.Id),
                Email = user.Email,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Phone = user.Phone,
                Role = roles.FirstOrDefault()
            };
        }

        public async Task<UserResultDto> LoginAsync(LoginDto loginDto)
        {
            var result = await _signInManager.PasswordSignInAsync(loginDto.Email, loginDto.Password, false, false);

            if (!result.Succeeded)
            {
                return new UserResultDto
                {
                    Success = false,
                    Errors = new[] { "Invalid login attempt." }
                };
            }

            // Generate token (if needed) or return success
            return new UserResultDto { Success = true, Token = "DummyTokenForNow" };
        }

        public Task LogoutAsync()
        {
            throw new NotImplementedException();
        }

        public async Task<UserResultDto> RegisterAsync(UserDto registerDto)
        {
            if (registerDto.Password != registerDto.ConfirmPassword)
            {
                return new UserResultDto
                {
                    Success = false,
                    Errors = new[]
                { "Passwords do not match." }
                };
            }

            var user = new applicationUser
            {
                UserName = registerDto.Email,
                Email = registerDto.Email,
                FirstName = registerDto.FirstName,
                LastName = registerDto.LastName,
                Phone = registerDto.Phone
            };
            var result = await _userManager.CreateAsync(user, registerDto.Password);

            var roleName = (string.IsNullOrEmpty(registerDto.Role)) ? "User" : registerDto.Role;

            var roleResult = await _userManager.AddToRoleAsync(user, roleName);

            if (!roleResult.Succeeded)
            {
                return new UserResultDto
                {
                    Success = false,
                    Errors = roleResult.Errors?.Select(e => e.Description)
                };
            }

            return new UserResultDto
            {
                Success = result.Succeeded,
                Errors = result.Errors?.Select(e => e.Description)
            };
        }
    }
}
