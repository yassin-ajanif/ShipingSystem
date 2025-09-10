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
            CreateMap<TbCountry, TbCountryDto>().ReverseMap();
            CreateMap<TbCarrier, TbCarrierDto>().ReverseMap();
            CreateMap<TbRefreshToken, TbRefreshTokenDto>().ReverseMap();
            CreateMap<TbCity, TbCityDto>().ReverseMap();
            CreateMap<TbPaymentMethod, TbPaymentMethodDto>().ReverseMap();
            CreateMap<TbShippingType, TbShippingTypeDto>().ReverseMap();
            CreateMap<TbUserReceiver, TbUserReceiverDto>().ReverseMap();
            CreateMap<TbUserSebder, TbUserSenderDto>().ReverseMap();
            CreateMap<TbShippment, TbShippmentDto>().ReverseMap();
            CreateMap<TbShippmentStatus, TbShippmentStatusDto>().ReverseMap();
            CreateMap<TbSubscriptionPackage, TbSubscriptionPackageDto>().ReverseMap();
            CreateMap<TbUserSubscription, TbUserSubscriptionDto>().ReverseMap();
            CreateMap<TbSetting, TbSettingDto>().ReverseMap();
    
        }
    }
}
