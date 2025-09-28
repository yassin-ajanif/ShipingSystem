using AutoMapper;
using BusinessAccessLayer.Interfaces;
using DataAccessLayer.Interfaces;
using Domains;
using BusinessAccessLayer.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessAccessLayer.Services
{
    public class ShippingTypeService : GenericService<TbShippingType, ShippingTypeDto>,IShippingTypeService
    {
      

        public ShippingTypeService(IGenericUnitOfWork genericUnitOfWork,
            IMapper mapper, IUserService userService) :
            base(genericUnitOfWork, mapper, userService)
        {
        }
    }
}
