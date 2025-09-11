using System;
using System.ComponentModel.DataAnnotations;

namespace Domains.DTOs
{
    public class SettingDto : BaseDto
    {
        
        [Required]
        [StringLength(200)]
        public string SettingKey { get; set; } = string.Empty;
        
        [StringLength(1000)]
        public string? SettingValue { get; set; }
        
        [StringLength(500)]
        public string? Description { get; set; }
      
    }
}