using Apis.Models;
using BusinessAccessLayer.DTOs;
using BusinessAccessLayer.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Apis.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
   // [Authorize] // JWT authentication required
    public class UserController : ControllerBase
    {
        private readonly IUserSubscriptionService _userSubscriptionService;

        public UserController(IUserSubscriptionService userSubscriptionService)
        {
            _userSubscriptionService = userSubscriptionService;
        }

        [HttpPost("subscribe/{subscriptionPackageId}")]
        public async Task<ActionResult<ApiResponse<UserSubscriptionResponseDto>>> SubscribeUser(Guid subscriptionPackageId)
        {
            try
            {
                // Pass the GUID directly as parameter
                var result = await _userSubscriptionService.SubscribeCurrentUserAsync(subscriptionPackageId);
                
                return Ok(ApiResponse<UserSubscriptionResponseDto>.SuccessResponse(result, "Subscription successful"));
            }
            catch (UnauthorizedAccessException ex) // Invalid or missing JWT token
            {
                return Unauthorized(ApiResponse<UserSubscriptionResponseDto>.FailResponse(
                    "Authentication failed",
                    new List<string> { ex.Message }));
            }
            catch (InvalidOperationException ex) // User already subscribed
            {
                return Conflict(ApiResponse<UserSubscriptionResponseDto>.FailResponse(
                    "Subscription conflict",
                    new List<string> { ex.Message }));
            }
            catch (ArgumentException ex) // Package not found
            {
                return NotFound(ApiResponse<UserSubscriptionResponseDto>.FailResponse(
                    "Package not found",
                    new List<string> { ex.Message }));
            }
            catch (Exception ex)
            {
                return StatusCode(500, ApiResponse<UserSubscriptionResponseDto>.FailResponse(
                    "Something went wrong"));
            }
        }

        [HttpGet("{userId:guid}/subscription")]
        public async Task<ActionResult<ApiResponse<UserSubscriptionDetailsDto>>> GetSubscriptionByUserId(Guid userId)
        {
            try
            {
                var result = await _userSubscriptionService.GetSubscriptionByUserIdAsync(userId);
                if (result == null)
                {
                    return NotFound(ApiResponse<UserSubscriptionDetailsDto>.FailResponse(
                        "Subscription not found"));
                }

                return Ok(ApiResponse<UserSubscriptionDetailsDto>.SuccessResponse(
                    result,
                    "Subscription retrieved successfully"));
            }
            catch (Exception)
            {
                return StatusCode(500, ApiResponse<UserSubscriptionDetailsDto>.FailResponse(
                    "Something went wrong"));
            }
        }
    }
}
