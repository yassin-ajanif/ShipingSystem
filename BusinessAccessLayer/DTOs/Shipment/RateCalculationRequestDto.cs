using System.ComponentModel.DataAnnotations;

namespace BusinessAccessLayer.DTOs.Shipment
{
    public class RateCalculationRequestDto
    {
        [Required(ErrorMessage = "Origin is required")]
        public string Origin { get; set; } = string.Empty;

        [Required(ErrorMessage = "Destination is required")]
        public string Destination { get; set; } = string.Empty;

        [Required(ErrorMessage = "Weight is required")]
        [Range(0.1, 1000, ErrorMessage = "Weight must be between 0.1 and 1000 kg")]
        public decimal WeightKg { get; set; }
    }
}