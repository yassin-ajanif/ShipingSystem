using System;
using System.ComponentModel.DataAnnotations;

namespace BusinessAccessLayer.DTOs
{
    public class UserSubscriptionDto : BaseDto
    {
        [Required]
        public Guid UserId { get; set; }
        
        [Required]
        public Guid PackageId { get; set; }
        
        [Required]
        public DateTime SubscriptionDate { get; set; }
    }
}