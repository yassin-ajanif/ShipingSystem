using AutoMapper;
using BusinessAccessLayer.Interfaces;
using DataAccessLayer.Interfaces;
using Domains;
using Domains.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessAccessLayer.Services
{
    public class SenderService : GenericService<TbUserSebder, UserSenderDto>, ISenderService
    {
        public SenderService(IGenericRepository<TbUserSebder> repository, 
            IMapper mapper, IUserService userService,IGenericUnitOfWork genericUnitOfWork) 
            : base(genericUnitOfWork, mapper, userService )
        {
        }
    }
}
