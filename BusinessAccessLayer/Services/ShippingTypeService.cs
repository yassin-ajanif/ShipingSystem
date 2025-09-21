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
    public class ShippingTypeService : GenericService<TbShippingType, ShippingTypeDto>
    {
        public ShippingTypeService(IGenericRepository<TbShippingType> repository, 
            IMapper mapper, IUserService userService
            ,IGenericUnitOfWork genericUnitOfWork) : 
            base(genericUnitOfWork, mapper, userService )
        {
        }
    }
}
