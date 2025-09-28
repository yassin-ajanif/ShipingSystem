using AutoMapper;

using BusinessAccessLayer.Interfaces;
using DataAccessLayer.Interfaces;
using BusinessAccessLayer.DTOs;
using Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessAccessLayer.Services
{
    public class ReceiverService : GenericService<TbUserReceiver, UserReceiverDto>,
        IRecieverService
    {
        
        public ReceiverService(IGenericUnitOfWork genericUnitOfWork,
            IMapper mapper, IUserService userService) :
            base(genericUnitOfWork, mapper, userService)
        {
        }


    }
}
