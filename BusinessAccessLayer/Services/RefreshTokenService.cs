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
    public class RefreshTokenService : GenericService<TbRefreshToken, RefreshTokenDto>, IRefreshTokenService
    {
        private readonly IMapper _mapper;
        private readonly IGenericRepository<TbRefreshToken> _repository;
        private readonly IUserService _userService;
        public RefreshTokenService
            ( 
              IGenericRepository<TbRefreshToken> repository,
              IMapper mapper,
              IUserService userService
            ) : base(repository,mapper,userService)
        {
            _mapper = mapper;
            _userService = userService;
            _repository = repository;
        }

        public async Task<RefreshTokenDto> GetByToken(string token)
        {
            try
            {
                var refreshToken = await _repository.GetFirstOrDefault(x => x.Token == token);
                return _mapper.Map<RefreshTokenDto>(refreshToken);
            }
            catch (Exception ex)
            {
                // Log the exception if needed
                throw new Exception($"Error retrieving refresh token: {token}", ex);
            }
        }

        public async Task<bool> RefreshToken(RefreshTokenDto tokenDto)
        {
            var tokenList = await _repository.GetList(a => a.UserId == tokenDto.UserId && a.CurrentState == 1);
          
            foreach (var dbToken in tokenList)
            {
                _repository.ChangeStatus( Guid.Parse(dbToken.UserId), 2);
            }

           // var newRefreshTokenDb = _mapper.Map<RefreshTokenDto,TbRefreshToken>(tokenDto);
            //await _repository.AddAsync(newRefreshTokenDb);
            await AddAsync(tokenDto);
            return true;
        }


    }
}
