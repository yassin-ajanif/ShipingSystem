using BusinessAccessLayer.DTOs.Shipment;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessAccessLayer.Interfaces
{
    public interface IShippingService 
    {
        public Task<ShippingResponse> CreateShippment(CreateShippingRequest shippmentDto);
    }
}
