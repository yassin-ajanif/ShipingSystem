using AutoMapper;
using BusinessAccessLayer.Interfaces;
using DataAccessLayer.Interfaces;
using Domains;
using BusinessAccessLayer.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessAccessLayer.Services
{
    public class PackageTypeService : GenericService<TbSubscriptionPackage, SubscriptionPackageDto>
    {
        public PackageTypeService(IGenericRepository<TbSubscriptionPackage> repository, 
            IMapper mapper, IUserService userService,IGenericUnitOfWork genericUnitOfWork)
            : base(genericUnitOfWork, mapper, userService )
        {
        }

        public PackageTypeService(IGenericUnitOfWork genericUnitOfWork,
            IMapper mapper, IUserService userService )
            : base(genericUnitOfWork, mapper, userService)
        {
        }
    }
}
