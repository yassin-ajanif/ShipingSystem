using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace BusinessAccessLayer.DTOs
{
    public class ShippingTypeLookupDto
    {
        [Required]
        public Guid ShippingTypeId { get; set; }

        [DefaultValue("")]
        [StringLength(200)]
        public string ShippingEName { get; set; } = string.Empty;

        [DefaultValue("")]
        [StringLength(200)]
        public string ShippingAName { get; set; } = string.Empty;
    }
}
