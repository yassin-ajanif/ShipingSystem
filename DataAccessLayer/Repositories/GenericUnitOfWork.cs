using DataAccessLayer.Interfaces;
using Domains;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Repositories
{
    public class GenericUnitOfWork : IGenericUnitOfWork
    {
        private readonly ShipingContext _context;
        private readonly ConcurrentDictionary<Type, object> _repositories = new();
        private IDbContextTransaction? _tx;
        private readonly ILoggerFactory _loggerFactory;


        public GenericUnitOfWork(ShipingContext context, ILoggerFactory loggerFactory)
        {
            _context = context;
            _loggerFactory = loggerFactory;
        }
        public async Task BeginTransactionAsync()
        {
            _tx = await _context.Database.BeginTransactionAsync();
        }
        public async Task RollbackAsync() => await _tx?.RollbackAsync()!;

        public Task CommitTransactionAsync()
        {
            throw new NotImplementedException();
        }

        public ValueTask DisposeAsync()
        {
            throw new NotImplementedException();
        }

        public IGenericRepository<T> Repository<T>() where T : Base
        {
            return (IGenericRepository<T>)_repositories.GetOrAdd
                (typeof(T), (type) => new GenericRepository<T>(
                    _context,
                    _loggerFactory.CreateLogger<GenericRepository<T>>()));
        }

        public Task<int> SaveChangesAsync()
        {
            return _context.SaveChangesAsync();
        } 
    }
}
