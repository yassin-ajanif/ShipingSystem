using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Interfaces
{
    public interface IGenericRepository <T> where T : class
    {
        Task<IEnumerable<T>> GetAllAsync();
        Task<T> GetByIdAsync(Guid id);
        Task <T>AddAsync(T entity);
        Task <T>UpdateAsync(T entity);
        Task<bool>DeleteAsync(Guid id);
        Task<T>GetFirstOrDefault(Expression<Func<T,bool>>filter);
        Task<IEnumerable<T>> GetList(Expression<Func<T,bool>>filter);
        Task<bool> ChangeStatus(Guid id, int status = 1);
    }
}
