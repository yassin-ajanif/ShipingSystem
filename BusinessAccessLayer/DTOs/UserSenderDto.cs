using System;
using System.ComponentModel.DataAnnotations;

namespace Domains.DTOs
{
    public class UserSenderDto : BaseDto
    {
        
        [Required]
        [StringLength(200)]
        public string SenderName { get; set; } = string.Empty;
        
        [StringLength(200)]
        [EmailAddress]
        public string? Email { get; set; }
        
        [StringLength(200)]
        public string? Phone { get; set; }
        
        [StringLength(500)]
        public string? Address { get; set; }
        
        [Required]
        public Guid CityId { get; set; }
        
        public string? CityName { get; set; } // For display purposes
      
    }
}