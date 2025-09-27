using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace BusinessAccessLayer.DTOs
{
    public class SubscriptionPackageDto : BaseDto
    {
        
        [Required]
        [StringLength(200)]
        [DefaultValue("")]
        public string PackageName { get; set; } = string.Empty;
        
        [Range(0, double.MaxValue)]
        [DefaultValue(0)]
        public decimal? Price { get; set; }
        
        [Range(1, int.MaxValue)]
        [DefaultValue(0)]
        public int? DurationInDays { get; set; }
        
        [StringLength(1000)]
        [DefaultValue("")]
        public string? Description { get; set; }
        
     
    }
}