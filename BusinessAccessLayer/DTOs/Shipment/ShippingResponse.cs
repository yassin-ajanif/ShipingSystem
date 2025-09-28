using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessAccessLayer.DTOs.Shipment
{
    public class ShippingResponse : BaseDto
    {
        public UserSenderDto Sender { get; set; }
        public UserReceiverDto Receiver { get; set; }
        public ShippingTypeDto ShippingType { get; set; }
        public PaymentMethodDto PaymentMethod { get; set; }
        public SubscriptionPackageDto SubscriptionPackage { get; set; }
    }
}
