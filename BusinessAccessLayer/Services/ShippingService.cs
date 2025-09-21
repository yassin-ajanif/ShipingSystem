using AutoMapper;
using BusinessAccessLayer.Interfaces;
using DataAccessLayer.Interfaces;
using DataAccessLayer.Repositories;
using Domains;
using Domains.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessAccessLayer.Services
{
    public class ShippingService : GenericService<TbShippment, ShippmentDto> , IShippingService
    {
        private readonly IMapper _mapper;
        private readonly IGenericRepository<TbShippment> _repository;
        private readonly IUserService _userService;
        private readonly IGenericUnitOfWork _genericUnitOfWork;
        private readonly IRecieverService _receiverService;
        private readonly ISenderService _senderService;
        public ShippingService(
            IGenericRepository<TbShippment> repository,
            IMapper mapper,
            IUserService userService,
            IRecieverService recieverService,
            ISenderService senderService,
            IGenericUnitOfWork genericUnitOfWork
            )
            : base(genericUnitOfWork, mapper, userService)
        {

            _mapper = mapper;
            _userService = userService;
            _genericUnitOfWork = genericUnitOfWork;
            _receiverService = recieverService;
            _senderService = senderService;
            _repository = repository;
        }

        public async Task<ShippmentDto> CreateShippment(ShippmentDto shippmentDto)
        {
            
            await _genericUnitOfWork.BeginTransactionAsync();

            try
            {
                 
                var sender = await _senderService.AddAsync(shippmentDto.Sender);
                //var receiver = await _receiverService.AddAsync(shippmentDto.Receiver);
                shippmentDto.SenderId = sender.Id;

                await _genericUnitOfWork.CommitTransactionAsync();

                return shippmentDto;
            }

            catch (Exception ex)
            {
                await _genericUnitOfWork.RollbackAsync();
                throw new Exception($"Error creating shipment: {ex.Message}");
            }
        }
    }
}
