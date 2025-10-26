namespace BusinessAccessLayer.DTOs.Shipment
{
    public class RateCalculationResponseDto
    {
        public decimal DistanceKm { get; set; }
        public decimal WeightKg { get; set; }
        public decimal RatePerKm { get; set; }
        public decimal RatePerKg { get; set; }
        public decimal DistanceCost { get; set; }
        public decimal WeightCost { get; set; }
        public decimal TotalAmount { get; set; }
    }
}