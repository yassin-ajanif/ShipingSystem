using System;
using System.ComponentModel.DataAnnotations;

namespace Domains.DTOs
{
    public class SubscriptionPackageDto : BaseDto
    {
        
        [Required]
        [StringLength(200)]
        public string PackageName { get; set; } = string.Empty;
        
        [Range(0, double.MaxValue)]
        public decimal? Price { get; set; }
        
        [Range(1, int.MaxValue)]
        public int? DurationInDays { get; set; }
        
        [StringLength(1000)]
        public string? Description { get; set; }
        
     
    }
}