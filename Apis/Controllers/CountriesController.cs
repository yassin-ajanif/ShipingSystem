using Apis.Models;
using BusinessAccessLayer.DTOs;
using BusinessAccessLayer.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Apis.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CountriesController : ControllerBase
    {
        private readonly ICountriesService _countriesService;
        private readonly ICitiesService _citiesService;

        public CountriesController(ICountriesService countriesService, ICitiesService citiesService)
        {
            _countriesService = countriesService;
            _citiesService = citiesService;
        }

        [HttpGet]
        public async Task<ActionResult<ApiResponse<IEnumerable<CountryDto>>>> GetCountries()
        {
            try
            {
                var countries = await _countriesService.GetAllAsync();
                return Ok(ApiResponse<IEnumerable<CountryDto>>.SuccessResponse(
                    countries,
                    "Countries retrieved successfully"));
            }
            catch (Exception)
            {
                return StatusCode(500, ApiResponse<IEnumerable<CountryDto>>.FailResponse(
                    "Something went wrong while retrieving countries"));
            }
        }

        [HttpGet("{countryId:guid}/cities")]
        public async Task<ActionResult<ApiResponse<IEnumerable<CityDto>>>> GetCitiesByCountry(Guid countryId)
        {
            try
            {
                var cities = await _citiesService.GetByCountryIdAsync(countryId);
                return Ok(ApiResponse<IEnumerable<CityDto>>.SuccessResponse(
                    cities,
                    "Cities retrieved successfully"));
            }
            catch (Exception)
            {
                return StatusCode(500, ApiResponse<IEnumerable<CityDto>>.FailResponse(
                    "Something went wrong while retrieving cities"));
            }
        }
    }
}
