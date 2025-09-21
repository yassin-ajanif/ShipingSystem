using Apis.Models;
using BusinessAccessLayer.Interfaces;
using Domains.DTOs;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Apis.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HomeController : ControllerBase
    {
        private readonly IShippingService _shippingService;
        public HomeController(IShippingService shippingService)
        {
            _shippingService = shippingService;
        }

        [HttpPost]
        public async Task<ActionResult<ApiResponse<ShippmentDto>>> CreateShipment(ShippmentDto shippmentDto)
        {
            var createdShipment = await _shippingService.CreateShippment(shippmentDto);

            var response = new ApiResponse<ShippmentDto>
            {
                Success = true,
                Message = "Shipment created successfully",
                Data = shippmentDto // In a real scenario, this would be the created shipment with its ID and other details
            };
            return Ok(response);
        }

    }
}
