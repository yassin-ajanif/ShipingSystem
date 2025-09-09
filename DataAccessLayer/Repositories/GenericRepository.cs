using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataAccessLayer.Exceptions;
using DataAccessLayer.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace DataAccessLayer.Repositories
{
    public class GenericRepository<T> : IGenericRepository<T> where T : class
    {
        private readonly ShipingContext _context;
        private readonly DbSet<T> _dbSet;
        private readonly ILogger<GenericRepository<T>> _logger;

        public GenericRepository(ShipingContext context,ILogger<GenericRepository<T>> logger)
        {
            _context = context;
            _dbSet = _context.Set<T>();
            _logger = logger;
        }

        public async Task<IEnumerable<T>> GetAllAsync()
        {
            try
            {
                return await _dbSet.ToListAsync();
            }
            catch (Exception ex)
            {
                throw new CustomException(ex, $"Error retrieving all entities of type {typeof(T).Name}", _logger);
            }
        }

        public async Task<T> GetByIdAsync(Guid id)
        {
            try
            {
                return await _dbSet.FindAsync(id);
            }
            catch (Exception ex)
            {
                throw new CustomException(ex, $"Error retrieving entity of type {typeof(T).Name} with ID {id}", _logger);
            }
        }

        public async Task AddAsync(T entity)
        {
            try
            {
                await _dbSet.AddAsync(entity);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new CustomException(ex, $"Error adding entity of type {typeof(T).Name}", _logger);
            }
        }

        public async Task UpdateAsync(T entity)
        {
            try
            {
                _dbSet.Update(entity);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new CustomException(ex, $"Error updating entity of type {typeof(T).Name}", _logger);
            }
        }

        public async Task DeleteAsync(Guid id)
        {
            try
            {
                var entity = await _dbSet.FindAsync(id);
                if (entity != null)
                {
                    _dbSet.Remove(entity);
                    await _context.SaveChangesAsync();
                }
            }
            catch (Exception ex)
            {
                throw new CustomException(ex, $"Error deleting entity of type {typeof(T).Name} with ID {id}", _logger);
            }
        }

        Task<T> IGenericRepository<T>.AddAsync(T entity)
        {
            throw new NotImplementedException();
        }

        Task<T> IGenericRepository<T>.UpdateAsync(T entity)
        {
            throw new NotImplementedException();
        }
    }
}
