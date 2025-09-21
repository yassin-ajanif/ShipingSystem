using AutoMapper;
using BusinessAccessLayer.Interfaces;
using DataAccessLayer.Interfaces;
using Domains;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessAccessLayer.Services
{
    public class GenericService<T,DTO> : IGenericService<T,DTO> where T : Base
    {
        private readonly IGenericRepository<T> _repository;
        private readonly IMapper _mapper;
        private readonly IUserService _userService;
        private readonly IGenericUnitOfWork _genericUnitOfWork;
        public GenericService(IGenericRepository<T> repository,
            IMapper mapper, IUserService userService)
        {
            _repository = repository;   
            _mapper = mapper;
            _userService = userService;
        }

        public GenericService(IGenericUnitOfWork genericUnitOfWork,
            IMapper mapper, IUserService userService)
        {
            _repository = genericUnitOfWork.Repository<T>();
            _mapper = mapper;
            _userService = userService;
            _genericUnitOfWork = genericUnitOfWork;
        }

        public async Task<IEnumerable<DTO>> GetAllAsync()
        {
            var entities = await _repository.GetAllAsync();
            //   TDestination Map<TSource, TDestination>(TSource source);
            var dtos = _mapper.Map<IEnumerable<T>,IEnumerable<DTO>>(entities);  // sync mapping

            return dtos;
        }

        public async Task<DTO?> GetByIdAsync(Guid id)
        {
            var updatedEntity = await _repository.GetByIdAsync(id);
            return await _mapper.Map<T,Task<DTO>>(updatedEntity);
        }

        public async Task<DTO> AddAsync(DTO entity)
        {
            
            // Map DTO to Entity for repository
            var entityToAdd = _mapper.Map<DTO,T>(entity);
            entityToAdd.CreatedDate = DateTime.Now;
            entityToAdd.CreatedBy = _userService.GetLoggedInUser();
            // Add to repository (returns Task, not Task<T>)
            var entityAdded =  await _repository.AddAsync(entityToAdd);

            return entity;
        }

        public async Task<DTO> UpdateAsync(DTO entity)
        {
            // Map DTO to Entity for repository
            var entityToUpdate = _mapper.Map<DTO, T>(entity);

            // Add to repository (returns Task, not Task<T>)
            var entityUpdated = await _repository.UpdateAsync(entityToUpdate);

            return await _mapper.Map<T, Task<DTO>>(entityUpdated);
        }

        public async Task<bool> DeleteAsync(Guid id)
        {
            try
            {
                await _repository.DeleteAsync(id);
                return true;
            }
            catch
            {
                return false;
            }
        }
    }
}