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
    public class SubscriptionPackageService : GenericService<TbShippingType, SubscriptionPackageDto>, ISubscriptionPackageService
    {
        public SubscriptionPackageService(IGenericRepository<TbShippingType> repository, IMapper mapper,
            IUserService userService) : 
            base(repository, mapper, userService)
        {
        }
    }
}
