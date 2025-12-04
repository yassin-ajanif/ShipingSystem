using Apis.Models;
using BusinessAccessLayer.DTOs;
using BusinessAccessLayer.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;

namespace Apis.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ShippingTypesController : ControllerBase
    {
        private readonly IShippingTypeService _shippingTypeService;

        public ShippingTypesController(IShippingTypeService shippingTypeService)
        {
            _shippingTypeService = shippingTypeService;
        }

        [HttpGet]
        public async Task<ActionResult<ApiResponse<IEnumerable<ShippingTypeLookupDto>>>> GetAllShippingTypes()
        {
            try
            {
                var payload = await _shippingTypeService.GetLookupAsync();

                return Ok(ApiResponse<IEnumerable<ShippingTypeLookupDto>>.SuccessResponse(
                    payload,
                    "Shipping types retrieved successfully"));
            }
            catch (Exception)
            {
                return StatusCode(500, ApiResponse<IEnumerable<ShippingTypeLookupDto>>.FailResponse(
                    "Something went wrong while retrieving shipping types"));
            }
        }
    }
}
