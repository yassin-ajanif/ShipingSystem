using BusinessAccessLayer.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessAccessLayer.Interfaces
{
        public interface IUserService
        {
            Task<UserResultDto> RegisterAsync(UserDto registerDto);
            Task<UserResultDto> LoginAsync(LoginDto loginDto);
            Task LogoutAsync();
            Task<UserDto> GetUserByIdAsync(string userId);
            Task<UserDto> GetUserByEmailAsync(string email);
            Task<IEnumerable<UserDto>> GetAllUsersAsync();
            Guid GetLoggedInUser();
        }
}
