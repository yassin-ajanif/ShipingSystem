using BusinessAccessLayer.DTOs;
using Domains;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BusinessAccessLayer.Interfaces
{
    public interface ICitiesService : IGenericService<TbCity, CityDto>
    {
        Task<IEnumerable<CityDto>> GetByCountryIdAsync(Guid countryId);
    }
}
