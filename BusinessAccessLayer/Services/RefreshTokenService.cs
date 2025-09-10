using AutoMapper;
using BusinessAccessLayer.DTOs;
using BusinessAccessLayer.Interfaces;
using DataAccessLayer.Interfaces;
using Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessAccessLayer.Services
{
    public class RefreshTokenService : GenericService<TbRefreshToken, TbRefreshTokenDto>, IRefreshTokenService
    {
        private readonly IMapper _mapper;
        private readonly IGenericRepository<TbRefreshToken> _repository;
        public RefreshTokenService(IGenericRepository<TbRefreshToken> repository, IMapper mapper) : base(repository, mapper)
        {
            _mapper = mapper;
            _repository = repository;
        }

        public async Task<TbRefreshTokenDto> GetByToken(string token)
        {
            try
            {
                var refreshToken = await _repository.GetFirstOrDefault(x => x.Token == token);
                return _mapper.Map<TbRefreshTokenDto>(refreshToken);
            }
            catch (Exception ex)
            {
                // Log the exception if needed
                throw new Exception($"Error retrieving refresh token: {token}", ex);
            }
        }

        public async Task<bool> RefreshToken(TbRefreshTokenDto tokenDto)
        {
            try
            {
                // Check if token exists and is not expired
                var existingToken = await _repository.GetFirstOrDefault(x => x.Token == tokenDto.Token);

                if (existingToken == null)
                {
                    return false; // Token not found
                }

                if (existingToken.Expires <= DateTime.UtcNow)
                {
                    return false; // Token expired
                }

                // Update the token properties
                existingToken.Expires = tokenDto.Expires;
                existingToken.UpdatedDate = DateTime.UtcNow;
                existingToken.CurrentState = tokenDto.CurrentState;

                // Update in database
                await _repository.UpdateAsync(existingToken);
                return true;
            }
            catch (Exception ex)
            {
                // Log the exception if needed
                throw new Exception($"Error refreshing token for user: {tokenDto.UserId}", ex);
            }
        }


    }
}
