using System;
using System.ComponentModel.DataAnnotations;

namespace Domains.DTOs
{
    public class ShippmentDto : BaseDto
    {
        
        [Required]
        public Guid SenderId { get; set; }
        public string? SenderName { get; set; } // For display
        
        [Required]
        public Guid ReceiverId { get; set; }
        public string? ReceiverName { get; set; } // For display
        
        [Required]
        public Guid ShippingTypeId { get; set; }
        public string? ShippingTypeName { get; set; } // For display
        
        public UserSenderDto? Sender { get; set; }
        public UserReceiverDto? Receiver { get; set; }
        public ShippingTypeDto? ShippingType { get; set; }
        public SubscriptionPackageDto? SubscriptionPackage { get; set; }
        public PaymentMethodDto? PaymentMethod { get; set; }

        public Guid? PaymentMethodId { get; set; }
        public string? PaymentMethodName { get; set; } // For display
        
        [Range(0, double.MaxValue)]
        public decimal? PackageValue { get; set; }
        
        [Range(0, double.MaxValue)]
        public decimal? ShippingRate { get; set; }
        
        public DateTime? ShippingDate { get; set; }
        
       
    }
}