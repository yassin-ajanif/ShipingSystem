using Apis.Models;
using BusinessAccessLayer.DTOs.Shipment;
using BusinessAccessLayer.Interfaces;
using BusinessAccessLayer.Services;
using DataAccessLayer.Exceptions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Runtime.ConstrainedExecution;

namespace Apis.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ShipmentController : ControllerBase
    {
        private readonly IShippingService _shippingService;
        public ShipmentController(IShippingService shippingService)
        {
            _shippingService = shippingService;
        }

        [HttpPost("create")]
        public async Task<ActionResult<ApiResponse<CreateShippingRequest>>> CreateShipment(CreateShippingRequest createShippingRequest)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            try
            {


                var createdShipment = await _shippingService.CreateShippment(createShippingRequest);

                var response = ApiResponse<ShippingResponse>.SuccessResponse(createdShipment, "Shipment created successfully");
                return Ok(response);
            }

            catch (CustomException cex)
            {
                return StatusCode(500, ApiResponse<CreateShippingRequest>.
                    FailResponse("Data AccessExcetpion", new List<string>() { cex.Message }));
            }
            catch (Exception ex)
            {

                return StatusCode(500, ApiResponse<CreateShippingRequest>.
                        FailResponse("GeneralException", new List<string>() { ex.Message }));
            }



        }

        [HttpGet("getAll")]
        public async Task<IActionResult> getAllShipment()
        {
            return StatusCode(200, await _shippingService.GetAllShipmentSummaries());
        }

        [HttpPatch("{id}/cancel")]
        public async Task<ActionResult<ApiResponse<object>>> CancelShipment(Guid id)
        {
            try
            {
                var result = await _shippingService.CancelShipmentAsync(id);

                if (result)
                {
                    var response = ApiResponse<object>.SuccessResponse(new { }, "Shipment cancelled successfully");
                    return Ok(response);
                }
                else
                {
                    return StatusCode(500, ApiResponse<object>.FailResponse("Failed to cancel shipment", new List<string>()));
                }
            }
            catch (ArgumentException ex)
            {
                return NotFound(ApiResponse<object>.FailResponse("Shipment not found", new List<string> { ex.Message }));
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(ApiResponse<object>.FailResponse("Invalid operation", new List<string> { ex.Message }));
            }

            catch (Exception ex)
            {
                return StatusCode(500, ApiResponse<object>.FailResponse("something went wrong"));
            }
        }

        [HttpPatch("{id}/return")]
        public async Task<ActionResult<ApiResponse<object>>> ReturnShipment(Guid id)
        {
            try
            {
                var result = await _shippingService.ReturnShipmentAsync(id);

                if (result)
                {
                    var response = ApiResponse<object>.SuccessResponse(new { }, "Shipment returned successfully");
                    return Ok(response);
                }
                else
                {
                    return StatusCode(500, ApiResponse<object>.FailResponse("Failed to return shipment", new List<string>()));
                }
            }
            catch (ArgumentException ex)
            {
                return NotFound(ApiResponse<object>.FailResponse("Shipment not found", new List<string> { ex.Message }));
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(ApiResponse<object>.FailResponse("Invalid operation", new List<string> { ex.Message }));
            }
            catch (Exception ex)
            {
                return StatusCode(500, ApiResponse<object>.FailResponse("something went wrong"));
            }
        }

        [HttpGet("{id}/status")]
        public async Task<ActionResult<ApiResponse<byte>>> TrackShipmentStatus(Guid id)
        {
            try
            {
                var statusId = await _shippingService.TrackShipmentStatusAsync(id);

                var response = ApiResponse<byte>.SuccessResponse(statusId, "Shipment status retrieved successfully");
                return Ok(response);
            }
            catch (ArgumentException ex)
            {
                return NotFound(ApiResponse<byte>.FailResponse("Shipment not found", new List<string> { ex.Message }));
            }
            catch (Exception ex)
            {
                return StatusCode(500, ApiResponse<byte>.FailResponse("something went wrong"));
            }
        }

        [HttpPost("calculate-rate")]
        public async Task<ActionResult<ApiResponse<RateCalculationResponseDto>>> CalculateShippingRate([FromBody] RateCalculationRequestDto request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var rateCalculation = await _shippingService.CalculateShippingRateAsync(request);

                var response = ApiResponse<RateCalculationResponseDto>.SuccessResponse(rateCalculation, "Rate calculated successfully");
                return Ok(response);
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(ApiResponse<RateCalculationResponseDto>.FailResponse("Configuration error", new List<string> { ex.Message }));
            }
            catch (Exception ex)
            {
                return StatusCode(500, ApiResponse<RateCalculationResponseDto>.FailResponse("Something went wrong"));
            }
        }

        

    }
}
