using AutoMapper;
using BusinessAccessLayer.DTOs;
using BusinessAccessLayer.Interfaces;
using DataAccessLayer.Interfaces;
using Domains;

namespace BusinessAccessLayer.Services
{
    public class UserSubscriptionService : GenericService<TbUserSubscription, UserSubscriptionDto>, IUserSubscriptionService
    {
        private readonly IMapper _mapper;
        private readonly IGenericRepository<TbUserSubscription> _userSubscriptionRepository;
        private readonly IGenericRepository<TbSubscriptionPackage> _subscriptionPackageRepository;
        private readonly IUserService _userService;

        public UserSubscriptionService(
            IGenericRepository<TbUserSubscription> userSubscriptionRepository,
            IMapper mapper,
            IUserService userService,
            IGenericRepository<TbSubscriptionPackage> subscriptionPackageRepository)
            : base(userSubscriptionRepository, mapper, userService)
        {
            _mapper = mapper;
            _userService = userService;
            _userSubscriptionRepository = userSubscriptionRepository;
            _subscriptionPackageRepository = subscriptionPackageRepository;
        }

        public async Task<UserSubscriptionResponseDto> SubscribeCurrentUserAsync(Guid subscriptionPackageId)
        {
            // Step 1: Get current user from JWT
            var currentUserId = _userService.GetLoggedInUser();

            // Step 2: Validate user doesn't already have subscription
            await ValidateUserNotAlreadySubscribedAsync(currentUserId);

            // Step 3: Validate subscription package exists
            var package = await ValidateSubscriptionPackageExistsAsync(subscriptionPackageId);

            // Step 4: Create new subscription
            var subscriptionDto = new UserSubscriptionDto
            {
                UserId = currentUserId,
                PackageId = subscriptionPackageId,
                SubscriptionDate = DateTime.Now
            };

            // Step 5: Add subscription using GenericService (automatically sets CreatedBy and CreatedDate)
            var result = await AddAsync(subscriptionDto);

            // Step 6: Build simple response
            return new UserSubscriptionResponseDto
            {
                SubscriptionId = result.Id,
                UserId = currentUserId,
                PackageId = subscriptionPackageId,
                PackageName = package.PackageName,
                SubscriptionDate = result.SubscriptionDate
            };
        }

        /// <summary>
        /// Validates that the user doesn't already have an active subscription
        /// </summary>
        private async Task ValidateUserNotAlreadySubscribedAsync(Guid userId)
        {
            var existingSubscription = await _userSubscriptionRepository.GetFirstOrDefault(s => s.UserId == userId);
            
            if (existingSubscription != null)
            {
                throw new InvalidOperationException("User is already subscribed to a package. Only one subscription per user is allowed.");
            }
        }

        /// <summary>
        /// Validates that the subscription package exists and returns it
        /// </summary>
        private async Task<TbSubscriptionPackage> ValidateSubscriptionPackageExistsAsync(Guid subscriptionPackageId)
        {
            var package = await _subscriptionPackageRepository.GetByIdAsync(subscriptionPackageId);
            
            if (package == null)
            {
                throw new ArgumentException("Subscription package not found", nameof(subscriptionPackageId));
            }

            return package;
        }
    }
}