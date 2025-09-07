using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using ShipingSystem.Models;
using Domains;
using DataAccessLayer;
using Microsoft.EntityFrameworkCore;

namespace ShipingSystem.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly ShipingContext _context;
      

        public HomeController(ILogger<HomeController> logger, ShipingContext context)
        {
            _logger = logger;
            _context = context;

            
        }
        public IActionResult Index()
        {
            var test = _context.TbCountries.ToList();
            return View();
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
