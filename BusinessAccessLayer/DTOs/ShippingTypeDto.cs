using System;
using System.ComponentModel.DataAnnotations;

namespace Domains.DTOs
{
    public class ShippingTypeDto : BaseDto
    {
        
        [StringLength(200)]
        public string? ShippingTypeAName { get; set; }
        
        [StringLength(200)]
        public string? ShippingTypeEName { get; set; }
        
      
    }
}