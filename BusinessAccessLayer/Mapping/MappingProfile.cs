using AutoMapper;
using BusinessAccessLayer.DTOs;
using Domains;
using Domains.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessAccessLayer.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            // TbCountry mappings
            CreateMap<TbCountry, CountryDto>().ReverseMap();
            CreateMap<TbCarrier, CarrierDto>().ReverseMap();
            CreateMap<TbRefreshToken, RefreshTokenDto>().ReverseMap();
            CreateMap<TbCity, CityDto>().ReverseMap();
            CreateMap<TbPaymentMethod, PaymentMethodDto>().ReverseMap();
            CreateMap<TbShippingType, ShippingTypeDto>().ReverseMap();
            CreateMap<TbUserReceiver, UserReceiverDto>().ReverseMap();
            CreateMap<TbUserSebder, UserSenderDto>().ReverseMap();
            CreateMap<TbShippment, ShippmentDto>().ReverseMap();
            CreateMap<TbShippmentStatus, ShippmentStatusDto>().ReverseMap();
            CreateMap<TbSubscriptionPackage, SubscriptionPackageDto>().ReverseMap();
            CreateMap<TbUserSubscription, UserSubscriptionDto>().ReverseMap();
            CreateMap<TbSetting, SettingDto>().ReverseMap();
    
        }
    }
}
