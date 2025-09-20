using AutoMapper;
using BusinessAccessLayer.Interfaces;
using DataAccessLayer.Interfaces;
using Domains;
using Domains.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessAccessLayer.Services
{
    public class PaymentPackageService : GenericService<TbPaymentMethod, PaymentMethodDto>
    {
        public PaymentPackageService(IGenericRepository<TbPaymentMethod> repository, IMapper mapper, IUserService userService) : base(repository, mapper, userService)
        {
        }
    }
}
