using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace BusinessAccessLayer.DTOs
{
    public class UserReceiverDto : BaseDto
    {
        
        [Required]
        [StringLength(200)]
        [DefaultValue("")]


        public string ReceiverName { get; set; } = string.Empty;
        
        [StringLength(200)]
        [EmailAddress]
        [DefaultValue("")]
        public string? Email { get; set; }
        
        [StringLength(200)]
        [DefaultValue("")]
        public string? Phone { get; set; }
        
        [StringLength(500)]
        [DefaultValue("")]
        public string? Address { get; set; }
        
        [Required]
        [DefaultValue(typeof(Guid), "00000000-0000-0000-0000-000000000000")]

        public Guid CityId { get; set; }

        [DefaultValue("")]
        public string? CityName { get; set; } // For display purposes
        
      
    }
}