using BusinessAccessLayer.DTOs.Shipment;
using Domains.Views;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessAccessLayer.Interfaces
{
    public interface IShippingService 
    {
        public Task<ShippingResponse> CreateShippment(CreateShippingRequest shippmentDto);

        public Task<List<VwShipmentSummaryDTO>> GetAllShipmentSummaries();

        public Task<bool> CancelShipmentAsync(Guid shipmentId);

        public Task<bool> ReturnShipmentAsync(Guid shipmentId);

        public Task<byte> TrackShipmentStatusAsync(Guid shipmentId);

        public Task<RateCalculationResponseDto> CalculateShippingRateAsync(RateCalculationRequestDto request);

    }
}
