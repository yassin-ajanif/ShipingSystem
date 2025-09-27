using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace BusinessAccessLayer.DTOs
{
    public class ShippingTypeDto : BaseDto
    {
        
        [StringLength(200)]
        [DefaultValue("")]
        public string? ShippingTypeAName { get; set; }
        
        [StringLength(200)]
        [DefaultValue("")]
        public string? ShippingTypeEName { get; set; }
        
      
    }
}