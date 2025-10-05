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
            IPaymentMethodService paymentMethodService
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

    }
}
