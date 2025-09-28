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
    public class SubscriptionPackageService : GenericService<TbSubscriptionPackage, SubscriptionPackageDto>, ISubscriptionPackageService
    {
       
        public SubscriptionPackageService(IGenericUnitOfWork genericUnitOfWork , IMapper mapper,
            IUserService userService) :
            base(genericUnitOfWork, mapper, userService)
        {
        }
    }
}
