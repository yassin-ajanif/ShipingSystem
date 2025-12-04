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
        private readonly IMapper _mapper;
      

        public ShippingTypeService(IGenericUnitOfWork genericUnitOfWork,
            IMapper mapper, IUserService userService) :
            base(genericUnitOfWork, mapper, userService)
        {
            _mapper = mapper;
        }

        public async Task<IEnumerable<ShippingTypeLookupDto>> GetLookupAsync()
        {
            var shippingTypes = await GetAllAsync();
            return _mapper.Map<IEnumerable<ShippingTypeLookupDto>>(shippingTypes);
        }
    }
}
