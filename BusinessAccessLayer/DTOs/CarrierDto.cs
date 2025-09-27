using System;
using System.ComponentModel.DataAnnotations;

namespace BusinessAccessLayer.DTOs
{
    public class CarrierDto :BaseDto
    {
        
        [Required]
        [StringLength(200)]
        public string CarrierName { get; set; } = string.Empty;
      
    }
}