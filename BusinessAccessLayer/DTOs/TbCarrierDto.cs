using System;
using System.ComponentModel.DataAnnotations;

namespace Domains.DTOs
{
    public class TbCarrierDto :BaseDto
    {
        
        [Required]
        [StringLength(200)]
        public string CarrierName { get; set; } = string.Empty;
      
    }
}