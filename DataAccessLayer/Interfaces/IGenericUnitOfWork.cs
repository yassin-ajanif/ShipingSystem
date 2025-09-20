using Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Interfaces
{
        public interface IGenericUnitOfWork : IAsyncDisposable
        {
            IGenericRepository<T> Repository<T>() where T : Base;
            Task BeginTransactionAsync();
            Task CommitTransactionAsync();
            Task RollbackAsync();
            Task<int> SaveChangesAsync();

 
    }
}
