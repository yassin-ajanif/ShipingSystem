using AutoMapper;
using BusinessAccessLayer.DTOs;
using BusinessAccessLayer.Interfaces;
using DataAccessLayer.Interfaces;
using Domains;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BusinessAccessLayer.Services
{
    public class CitiesService : GenericService<TbCity, CityDto>, ICitiesService
    {
        private readonly IGenericRepository<TbCity> _repository;
        private readonly IMapper _mapper;

        public CitiesService(
            IGenericRepository<TbCity> repository,
            IMapper mapper,
            IUserService userService)
            : base(repository, mapper, userService)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<CityDto>> GetByCountryIdAsync(Guid countryId)
        {
            var cities = await _repository.GetList(c => c.CountryId == countryId);
            return _mapper.Map<IEnumerable<TbCity>, IEnumerable<CityDto>>(cities);
        }
    }
}
