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
        public Guid ShippingTypeId { get; set; }
        public Guid PaymentMethodId { get; set; }
        public Guid SubscriptionPackageID { get; set; }
        public byte StatusShipmentId { get; set;  }
    }
}
