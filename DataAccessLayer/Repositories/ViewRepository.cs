using DataAccessLayer.Exceptions;
using DataAccessLayer.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Repositories
{
    public class ViewRepository<T> : IViewRepository<T> where T : class
    {
        private readonly ShipingContext _context;
        private readonly DbSet<T> _dbSet;
        private readonly ILogger<ViewRepository<T>> _logger;

        public ViewRepository(ShipingContext context, ILogger<ViewRepository<T>> logger)
        {
            _context = context;
            _dbSet = _context.Set<T>();
            _logger = logger;
        }
        public async Task<List<T>> GetAll()
        {
            try
            {
                return await _dbSet.AsNoTracking().ToListAsync();
            }
            catch (Exception ex)
            {
                throw new CustomException(ex, "", _logger);
            }
        }

        public Task<T> GetById(Guid id)
        {
            throw new NotImplementedException();
        }

        public Task<T> GetFirstOrDefault(Expression<Func<T, bool>> filter)
        {
            throw new NotImplementedException();
        }

        public Task<List<T>> GetList(Expression<Func<T, bool>> filter)
        {
            throw new NotImplementedException();
        }
    }
}
