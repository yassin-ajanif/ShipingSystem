using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Apis.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HomeController : ControllerBase
    {
        [HttpGet]
        [Route("demo-data")]
        public IActionResult GetDemoData()
        {
            var demoData = new
            {
                Countries = new[]
                {
                    new { Id = Guid.NewGuid(), CountryAName = "الولايات المتحدة", CountryEName = "United States", CreatedDate = DateTime.UtcNow.AddDays(-30) },
                    new { Id = Guid.NewGuid(), CountryAName = "المملكة المتحدة", CountryEName = "United Kingdom", CreatedDate = DateTime.UtcNow.AddDays(-25) },
                    new { Id = Guid.NewGuid(), CountryAName = "فرنسا", CountryEName = "France", CreatedDate = DateTime.UtcNow.AddDays(-20) }
                },
                Carriers = new[]
                {
                    new { Id = Guid.NewGuid(), CarrierName = "DHL Express", CreatedDate = DateTime.UtcNow.AddDays(-15) },
                    new { Id = Guid.NewGuid(), CarrierName = "FedEx", CreatedDate = DateTime.UtcNow.AddDays(-10) },
                    new { Id = Guid.NewGuid(), CarrierName = "UPS", CreatedDate = DateTime.UtcNow.AddDays(-5) }
                },
                ShippingTypes = new[]
                {
                    new { Id = Guid.NewGuid(), ShippingTypeAName = "عادي", ShippingTypeEName = "Standard", CreatedDate = DateTime.UtcNow.AddDays(-12) },
                    new { Id = Guid.NewGuid(), ShippingTypeAName = "سريع", ShippingTypeEName = "Express", CreatedDate = DateTime.UtcNow.AddDays(-8) },
                    new { Id = Guid.NewGuid(), ShippingTypeAName = "فوري", ShippingTypeEName = "Overnight", CreatedDate = DateTime.UtcNow.AddDays(-3) }
                },
                Shipments = new[]
                {
                    new { 
                        Id = Guid.NewGuid(), 
                        SenderName = "John Doe",
                        ReceiverName = "Jane Smith",
                        ShippingType = "Express",
                        PackageValue = 299.99m,
                        ShippingRate = 25.50m,
                        ShippingDate = DateTime.UtcNow.AddDays(-2),
                        Status = "In Transit"
                    },
                    new { 
                        Id = Guid.NewGuid(), 
                        SenderName = "Ahmed Ali",
                        ReceiverName = "Sara Mohammed",
                        ShippingType = "Standard",
                        PackageValue = 150.00m,
                        ShippingRate = 15.00m,
                        ShippingDate = DateTime.UtcNow.AddDays(-1),
                        Status = "Processing"
                    }
                },
                Statistics = new
                {
                    TotalShipments = 1247,
                    PendingShipments = 23,
                    InTransitShipments = 156,
                    DeliveredShipments = 1068,
                    TotalRevenue = 45678.90m,
                    ActiveCarriers = 8,
                    RegisteredCountries = 45
                },
                ApiInfo = new
                {
                    Message = "Shipping System Demo Data",
                    Version = "1.0",
                    DataGenerated = DateTime.UtcNow,
                    Note = "This is sample data for demonstration purposes"
                }
            };

            return Ok(demoData);
        }

        [HttpGet]
        [Route("sample-shipment")]
        public IActionResult GetSampleShipment()
        {
            var sampleShipment = new
            {
                Id = Guid.NewGuid(),
                TrackingNumber = "SHP" + DateTime.UtcNow.Ticks.ToString()[^8..],
                Sender = new
                {
                    Name = "Tech Solutions LLC",
                    Email = "orders@techsolutions.com",
                    Phone = "+1-555-0123",
                    Address = "123 Business Ave, Tech City, TC 12345",
                    City = "Tech City",
                    Country = "United States"
                },
                Receiver = new
                {
                    Name = "Sarah Johnson",
                    Email = "sarah.johnson@email.com",
                    Phone = "+1-555-0789",
                    Address = "456 Residential St, Home Town, HT 67890",
                    City = "Home Town",
                    Country = "United States"
                },
                Package = new
                {
                    Description = "Electronics - Laptop Computer",
                    Weight = "2.5 kg",
                    Dimensions = "35x25x5 cm",
                    Value = 1299.99m,
                    InsuranceRequired = true
                },
                Shipping = new
                {
                    Type = "Express",
                    Carrier = "DHL Express",
                    ShippingRate = 45.99m,
                    EstimatedDelivery = DateTime.UtcNow.AddDays(2),
                    ShippingDate = DateTime.UtcNow
                },
                Status = new
                {
                    Current = "In Transit",
                    History = new[]
                    {
                        new { Status = "Order Placed", Date = DateTime.UtcNow.AddHours(-6), Location = "Origin Facility" },
                        new { Status = "Package Picked Up", Date = DateTime.UtcNow.AddHours(-4), Location = "Tech City Hub" },
                        new { Status = "In Transit", Date = DateTime.UtcNow.AddHours(-2), Location = "Regional Sorting Facility" }
                    }
                }
            };

            return Ok(sampleShipment);
        }
    }
}
