using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace BusinessAccessLayer.DTOs
{
    public class PaymentMethodDto : BaseDto
    {        
        [StringLength(200)]
        [DefaultValue("")]
        public string? PaymentMethodAName { get; set; }
        
        [StringLength(200)]
        [DefaultValue("")]
        public string? PaymentMethodEName { get; set; }
      
    }
}