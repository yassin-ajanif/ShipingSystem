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
    public class ReceiverService : GenericService<TbUserReceiver, UserDto>,IRecieverService
    {
        public ReceiverService(IGenericRepository<TbUserReceiver> repository, 
            IMapper mapper, IUserService userService,IGenericUnitOfWork genericUnitOfWork) :
            base(genericUnitOfWork, mapper, userService)
        {
        }
    }
}
