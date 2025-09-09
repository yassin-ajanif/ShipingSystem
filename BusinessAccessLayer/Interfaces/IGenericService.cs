using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessAccessLayer.Interfaces
{
    public interface IGenericService<T,DTO> 
    {
        Task<IEnumerable<DTO>> GetAllAsync();
        Task<DTO?> GetByIdAsync(Guid id);
        Task<DTO> AddAsync(DTO entity);
        Task<DTO> UpdateAsync(DTO entity);
        Task<bool> DeleteAsync(Guid id);
    }
}