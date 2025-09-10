using BusinessAccessLayer.DTOs;
using Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessAccessLayer.Interfaces
{
    public interface IRefreshTokenService : IGenericService<TbRefreshToken,TbRefreshTokenDto>
    {
        Task<TbRefreshTokenDto> GetByToken(string token);
        Task<bool> RefreshToken(TbRefreshTokenDto tokenDto);
    }
}
