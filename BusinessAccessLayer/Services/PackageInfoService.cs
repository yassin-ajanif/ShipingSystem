using AutoMapper;
using BusinessAccessLayer.DTOs;
using BusinessAccessLayer.Interfaces;
using DataAccessLayer.Interfaces;
using Domains;

namespace BusinessAccessLayer.Services
{
    public class PackageInfoService : GenericService<TbPackageInfo, PackageInfoDto>, IPackageInfoService
    {
        public PackageInfoService(
            IGenericRepository<TbPackageInfo> repository,
            IMapper mapper,
            IUserService userService)
            : base(repository, mapper, userService)
        {
        }
    }
}
