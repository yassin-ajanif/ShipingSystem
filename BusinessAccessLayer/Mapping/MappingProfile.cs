using AutoMapper;
using BusinessAccessLayer.DTOs;
using BusinessAccessLayer.DTOs.Shipment;
using Domains;
using System;

namespace BusinessAccessLayer.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            RegisterCoreMaps();
            RegisterShipmentMaps();
        }

        private void RegisterCoreMaps()
        {
            CreateMap<TbCountry, CountryDto>().ReverseMap();
            CreateMap<TbCarrier, CarrierDto>().ReverseMap();
            CreateMap<TbRefreshToken, RefreshTokenDto>().ReverseMap();
            CreateMap<TbCity, CityDto>().ReverseMap();
            CreateMap<TbPaymentMethod, PaymentMethodDto>().ReverseMap();
            CreateMap<TbShippingType, ShippingTypeDto>().ReverseMap();
            CreateMap<TbUserReceiver, UserReceiverDto>().ReverseMap();
            CreateMap<TbUserSebder, UserSenderDto>().ReverseMap();
            CreateMap<TbShippmentStatus, ShippmentStatusDto>().ReverseMap();
            CreateMap<TbSubscriptionPackage, SubscriptionPackageDto>().ReverseMap();
            CreateMap<TbUserSubscription, UserSubscriptionDto>().ReverseMap();
            CreateMap<TbSetting, SettingDto>().ReverseMap();

            // If you really need this mapping (entity <-> flat DB DTO), keep it:
            CreateMap<TbShippment, ShipmentDataToSendToDbDTO>().ReverseMap();
        }

        private void RegisterShipmentMaps()
        {
            // Requests/Responses
            CreateMap<CreateShippingRequest, ShippmentDto>().ReverseMap();
            CreateMap<ShippmentDto, ShippingResponse>().ReverseMap();

            // If you need to map between entity and API DTO directly
            CreateMap<TbShippment, ShippmentDto>().ReverseMap();

            // ShippmentDto -> ShipmentDataToSendToDbDTO (flatten nested objects to IDs)
            CreateMap<ShippmentDto, ShipmentDataToSendToDbDTO>()
                // keep BaseDto.Id
                .ForMember(d => d.Id, o => o.MapFrom(s => s.Id))

                // Sender
                .ForMember(d => d.SenderId, o => o.MapFrom(s =>
                    s.SenderId != Guid.Empty ? s.SenderId :
                    (s.Sender != null ? s.Sender.Id : Guid.Empty)))

                // Receiver
                .ForMember(d => d.ReceiverId, o => o.MapFrom(s =>
                    s.ReceiverId != Guid.Empty ? s.ReceiverId :
                    (s.Receiver != null ? s.Receiver.Id : Guid.Empty)))

                // ShippingType
                .ForMember(d => d.ShippingTypeId, o => o.MapFrom(s =>
                    s.ShippingTypeId != Guid.Empty ? s.ShippingTypeId :
                    (s.ShippingType != null ? s.ShippingType.Id : Guid.Empty)))

               
                .ForMember(d => d.PaymentMethodId, o => o.MapFrom(s =>
            s.PaymentMethodId != Guid.Empty
                ? s.PaymentMethodId
                : (s.PaymentMethod != null ? s.PaymentMethod.Id : Guid.Empty)))

                // SubscriptionPackage
                .ForMember(d => d.SubscriptionPackageID, o => o.MapFrom(s =>
                    s.SubscriptionPackageID != Guid.Empty ? s.SubscriptionPackageID :
                    (s.SubscriptionPackage != null ? s.SubscriptionPackage.Id : Guid.Empty)));

            // Reverse: only restore IDs; leave nested objects null
            CreateMap<ShipmentDataToSendToDbDTO, ShippmentDto>()
                .ForMember(d => d.Id,                    o => o.MapFrom(s => s.Id))
                .ForMember(d => d.SenderId,              o => o.MapFrom(s => s.SenderId))
                .ForMember(d => d.ReceiverId,            o => o.MapFrom(s => s.ReceiverId))
                .ForMember(d => d.ShippingTypeId,        o => o.MapFrom(s => s.ShippingTypeId))
                .ForMember(d => d.PaymentMethodId,       o => o.MapFrom(s => s.PaymentMethodId))
                .ForMember(d => d.SubscriptionPackageID, o => o.MapFrom(s => s.SubscriptionPackageID))
                .ForMember(d => d.Sender,               o => o.Ignore())
                .ForMember(d => d.Receiver,             o => o.Ignore())
                .ForMember(d => d.ShippingType,         o => o.Ignore())
                .ForMember(d => d.PaymentMethod,        o => o.Ignore())
                .ForMember(d => d.SubscriptionPackage,  o => o.Ignore());
        }
    }
}
