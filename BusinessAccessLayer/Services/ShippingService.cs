using AutoMapper;
using BusinessAccessLayer.Interfaces;
using DataAccessLayer.Interfaces;
using Domains;
using BusinessAccessLayer.DTOs;
using System;
using System.Threading.Tasks;
using BusinessAccessLayer.DTOs.Shipment;
using Domains.Views;

namespace BusinessAccessLayer.Services
{
    public class ShippingService : GenericService<TbShippment, ShipmentDataToSendToDbDTO>, IShippingService
    {
        private readonly IMapper _mapper;
        private readonly IGenericRepository<TbShippment> _repository;
        private readonly IUserService _userService;
        private readonly IGenericUnitOfWork _genericUnitOfWork;
        private readonly IRecieverService _receiverService;
        private readonly ISenderService _senderService;

        // NEW: services for the 3 lookups/creations
        private readonly IShippingTypeService _shippingTypeService;
        private readonly ISubscriptionPackageService _subscriptionPackageService;
        private readonly IPaymentMethodService _paymentMethodService;

        private readonly IViewRepository<VwShipmentSummary> _vwRepository;
        private readonly IGenericRepository<TbSetting> _settingsRepository;

        public ShippingService(
            IGenericRepository<TbShippment> repository,
            IViewRepository<VwShipmentSummary> viewRepository,
            IMapper mapper,
            IUserService userService,
            IRecieverService recieverService,
            ISenderService senderService,
            IGenericUnitOfWork genericUnitOfWork,
            // NEW: inject services
            IShippingTypeService shippingTypeService,
            ISubscriptionPackageService subscriptionPackageService,
            IPaymentMethodService paymentMethodService,
            IGenericRepository<TbSetting> settingsRepository
        )
            : base(genericUnitOfWork, mapper, userService)
        {
            _mapper = mapper;
            _userService = userService;
            _genericUnitOfWork = genericUnitOfWork;
            _receiverService = recieverService;
            _senderService = senderService;
            _repository = repository;

            _shippingTypeService = shippingTypeService;
            _subscriptionPackageService = subscriptionPackageService;
            _paymentMethodService = paymentMethodService;
            _settingsRepository = settingsRepository;

            _vwRepository = viewRepository;
        }

        public async Task<ShippingResponse> CreateShippment(CreateShippingRequest shippmentDto)
        {
            var mappedShipmenDto = _mapper.Map<ShippmentDto>(shippmentDto);
            await _genericUnitOfWork.BeginTransactionAsync();

            try
            {
             mappedShipmenDto.Sender.Id = 
                    await AddOrGetSenderIdAsync(mappedShipmenDto.SenderId, mappedShipmenDto.Sender);

             mappedShipmenDto.Receiver.Id =
                    await AddOrGetReceiverIdAsync(mappedShipmenDto.ReceiverId, mappedShipmenDto.Receiver);

             mappedShipmenDto.ShippingType.Id =
                    await AddOrGetShippingTypeIdAsync(mappedShipmenDto.ShippingTypeId, mappedShipmenDto.ShippingType);

             mappedShipmenDto.SubscriptionPackage.Id = 
                    await AddOrGetSubscriptionPackageIdAsync(mappedShipmenDto.SubscriptionPackageID, shippmentDto.SubscriptionPackage);

             mappedShipmenDto.PaymentMethod.Id = 
                    await AddOrGetPaymentMethodIdAsync(mappedShipmenDto.PaymentMethodId, mappedShipmenDto.PaymentMethod);

             var shipmentDataToSendToDb = _mapper.Map<ShipmentDataToSendToDbDTO>(mappedShipmenDto);

             var shipment = await AddAsync(shipmentDataToSendToDb); 
                mappedShipmenDto.Id = shipment.Id;

             var successShipmentDataToReturn = _mapper.Map<ShippingResponse>(mappedShipmenDto);

                await _genericUnitOfWork.CommitTransactionAsync();

                return successShipmentDataToReturn;

            }
            catch (Exception ex)
            {
                await _genericUnitOfWork.RollbackAsync();
                throw new Exception($"Error creating shipment: {ex.Message}", ex);
            }
        }

        // If user provides SenderId, return it; otherwise create and return the new Sender Id.
        private async Task<Guid> AddOrGetSenderIdAsync(Guid? senderId, UserSenderDto senderDto)
        {
            if (!senderId.HasValue || senderId == Guid.Empty)
            { 
                var sender = await _senderService.AddAsync(senderDto);
                return sender.Id;
            }

            return senderId.Value;
        }

        // Same idea for receiver
        private async Task<Guid> AddOrGetReceiverIdAsync(Guid? receiverId, UserReceiverDto receiverDto)
        {
            if (!receiverId.HasValue || receiverId == Guid.Empty)
            {
                
                var receiver = await _receiverService.AddAsync(receiverDto);
                return receiver.Id;
            }

            return receiverId.Value;
        }

        // ShippingType
        private async Task<Guid> AddOrGetShippingTypeIdAsync(Guid? shippingTypeId, ShippingTypeDto shippingTypeDto)
        {
            if (!shippingTypeId.HasValue || shippingTypeId == Guid.Empty)
            {
                
                var created = await _shippingTypeService.AddAsync(shippingTypeDto);
                return created.Id;
            }

            return shippingTypeId.Value;
        }

        // SubscriptionPackage
        private async Task<Guid> AddOrGetSubscriptionPackageIdAsync(Guid? packageId, SubscriptionPackageDto packageDto)
        {
            if (!packageId.HasValue || packageId == Guid.Empty)
            {

                var created = await _subscriptionPackageService.AddAsync(packageDto);
                return created.Id;
            }

            return packageId.Value;
        }

        // PaymentMethod
        private async Task<Guid> AddOrGetPaymentMethodIdAsync(Guid? paymentMethodId, PaymentMethodDto paymentMethodDto)
        {
            if (!paymentMethodId.HasValue || paymentMethodId == Guid.Empty)
            {

                var created = await _paymentMethodService.AddAsync(paymentMethodDto);
                return created.Id;
            }

            return paymentMethodId.Value;
        }
 
        public async Task<List<VwShipmentSummaryDTO>> GetAllShipmentSummaries()
        {
            var shipingSummaries = await _vwRepository.GetAll();
            return _mapper.Map<List<VwShipmentSummaryDTO>>(shipingSummaries);
        }

        public async Task<bool> CancelShipmentAsync(Guid shipmentId)
        {
            // Get the shipment from database
            var shipment = await _repository.GetByIdAsync(shipmentId);
            
            if (shipment == null)
            {
                throw new ArgumentException("Shipment not found", nameof(shipmentId));
            }

            // Check if shipment can be cancelled (only if status is "Ongoing" = 1)
            if (shipment.StatusShipmentId != 1) // 1 = Ongoing
            {
                throw new InvalidOperationException("Shipment cannot be cancelled. Only ongoing shipments can be cancelled.");
            }

            // Update status to "Cancelled" (3)
            shipment.StatusShipmentId = 3; // 3 = Cancelled
            shipment.UpdatedDate = DateTime.Now;

            // Save changes - single table update
            await _repository.UpdateAsync(shipment);

            return true;
        }

        public async Task<bool> ReturnShipmentAsync(Guid shipmentId)
        {
            // Get the shipment from database
            var shipment = await _repository.GetByIdAsync(shipmentId);
            
            if (shipment == null)
            {
                throw new ArgumentException("Shipment not found", nameof(shipmentId));
            }

            // Check if shipment can be returned (only if status is "Ongoing" = 1 or "Cancelled" = 3)
            if (shipment.StatusShipmentId != 1 && shipment.StatusShipmentId != 3)
            {
                throw new InvalidOperationException("Shipment cannot be returned. Only ongoing or cancelled shipments can be returned.");
            }

            // Update status to "Returned" (4)
            shipment.StatusShipmentId = 4; // 4 = Returned
            shipment.UpdatedDate = DateTime.Now;

            // Save changes - single table update
            await _repository.UpdateAsync(shipment);

            return true;
        }

        public async Task<byte> TrackShipmentStatusAsync(Guid shipmentId)
        {
            // Get the shipment from database
            var shipment = await _repository.GetByIdAsync(shipmentId);
            
            if (shipment == null)
            {
                throw new ArgumentException("Shipment not found", nameof(shipmentId));
            }

            // Return the status ID as byte
            return shipment.StatusShipmentId;
        }

        private decimal CalculateDistance(string origin, string destination)
        {
            // TODO: Implement actual distance calculation
            return 150.0m; // Constant 150 km for now
        }

        public async Task<RateCalculationResponseDto> CalculateShippingRateAsync(RateCalculationRequestDto request)
        {
            // Step 1: Calculate distance using the separate function
            decimal distanceKm = CalculateDistance(request.Origin, request.Destination);

            // Step 2: Query TbSetting by the seed GUID ID this is default guid id of rate values 
            var settingId = Guid.Parse("11111111-1111-1111-1111-111111111111");
            var shippingRates = await _settingsRepository.GetByIdAsync(settingId);
            
            if (shippingRates == null)
            {
                throw new InvalidOperationException("Shipping rates not found in system settings.");
            }

            // Step 3: Get rates from the seed data
            decimal ratePerKm = (decimal)shippingRates.KiloMeterRate!;
            decimal ratePerKg = (decimal)shippingRates.KilooGramRate!;

            // Step 4: Calculate costs
            decimal distanceCost = distanceKm * ratePerKm;
            decimal weightCost = request.WeightKg * ratePerKg;
            decimal totalAmount = distanceCost + weightCost;

            // Step 5: Build and return response
            return new RateCalculationResponseDto
            {
                DistanceKm = distanceKm,
                WeightKg = request.WeightKg,
                RatePerKm = ratePerKm,
                RatePerKg = ratePerKg,
                DistanceCost = Math.Round(distanceCost, 2),
                WeightCost = Math.Round(weightCost, 2),
                TotalAmount = Math.Round(totalAmount, 2)
            };
        }

    }
}
