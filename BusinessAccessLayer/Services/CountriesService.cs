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
using BusinessAccessLayer.DTOs;

namespace BusinessAccessLayer.Services
{
    public class CountriesService : GenericService<TbCountry, CountryDto>, ICountriesService
    {
        //IGenericRepository<T> repository, IMapper mapper
        public CountriesService(IGenericRepository<TbCountry> repository, IMapper mapper,
            IUserService userService,IGenericUnitOfWork genericUnitOfWork) 
            : base(genericUnitOfWork, mapper, userService)
        {
        }
    }
}

