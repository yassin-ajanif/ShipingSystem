using BusinessAccessLayer.DTOs;

namespace BusinessAccessLayer.Interfaces
{
    public interface IUserSubscriptionService
    {
        Task<UserSubscriptionResponseDto> SubscribeCurrentUserAsync(Guid subscriptionPackageId);
    }
}