using Domains.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessAccessLayer.Interfaces
{
    public interface IShippingService
    {
        public Task<ShippmentDto> CreateShippment(ShippmentDto shippmentDto);
    }
}
