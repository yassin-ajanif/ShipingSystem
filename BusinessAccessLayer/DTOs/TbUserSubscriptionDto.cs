using System;
using System.ComponentModel.DataAnnotations;

namespace Domains.DTOs
{
    public class TbUserSubscriptionDto : BaseDto
    {
        
        [Required]
        public Guid PackageId { get; set; }
        public string? PackageName { get; set; } // For display
        
        [Required]
        public string UserId { get; set; } = string.Empty;
        public string? UserName { get; set; } // For display
        
        public DateTime SubscriptionDate { get; set; }
        public DateTime? ExpiryDate { get; set; }
        
        [Range(0, double.MaxValue)]
        public decimal? AmountPaid { get; set; }
        
    
    }
}