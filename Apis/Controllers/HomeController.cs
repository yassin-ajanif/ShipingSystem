using Apis.Models;
using BusinessAccessLayer.DTOs.Shipment;
using BusinessAccessLayer.Interfaces;
using DataAccessLayer.Exceptions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Runtime.ConstrainedExecution;

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
        public async Task<ActionResult<ApiResponse<CreateShippingRequest>>> CreateShipment(CreateShippingRequest createShippingRequest)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            try {


            var createdShipment = await _shippingService.CreateShippment(createShippingRequest);

             var response = ApiResponse<CreateShippingRequest>.SuccessResponse(createdShipment, "Shipment created successfully");
                return Ok(response);
            }

            catch (CustomException cex)
            {
                return StatusCode(500, ApiResponse<CreateShippingRequest>.
                    FailResponse("Data AccessExcetpion",new List<string>() {cex.Message }));
            }
            catch (Exception ex) {

                return StatusCode(500, ApiResponse<CreateShippingRequest>.
                        FailResponse("GeneralException", new List<string>() { ex.Message }));
            }

            
            
        }

    }
}
