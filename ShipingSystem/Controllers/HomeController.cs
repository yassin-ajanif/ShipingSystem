using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using ShipingSystem.Models;
using Domains;
using DataAccessLayer;
using Microsoft.EntityFrameworkCore;
using DataAccessLayer.Interfaces;
using BusinessAccessLayer.Interfaces;
using BusinessAccessLayer.DTOs;

namespace ShipingSystem.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly ShipingContext _context;
        private readonly IGenericService<TbCountry,CountryDto> _countryService;

        public HomeController(ILogger<HomeController> logger, ShipingContext context,
            IGenericService<TbCountry, CountryDto> countryService)
        {
            _logger = logger;
            _context = context;
            _countryService = countryService;
        }
        
        public async Task<IActionResult> Index()
        {
            var countries = await _countryService.GetAllAsync();
            return View(countries.ToList());
        }

        public IActionResult Privacy()
        {
            var test = _context.TbCountries.ToList();
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
