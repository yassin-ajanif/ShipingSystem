using System;
using System.ComponentModel.DataAnnotations;

namespace Domains.DTOs
{
    public class TbPaymentMethodDto : BaseDto
    {        
        [StringLength(200)]
        public string? PaymentMethodAName { get; set; }
        
        [StringLength(200)]
        public string? PaymentMethodEName { get; set; }
      
    }
}