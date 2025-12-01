using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessAccessLayer.DTOs.Shipment
{
    public class CreateShippingRequest
    {
        [DefaultValue(typeof(Guid), "00000000-0000-0000-0000-000000000000")]
        public Guid? SenderId { get; set; }
            public UserSenderDto? Sender { get; set; }

        [DefaultValue(typeof(Guid), "00000000-0000-0000-0000-000000000000")]
        public Guid? ReceiverId { get; set; }
            public UserReceiverDto? Receiver { get; set; }

        [DefaultValue(typeof(Guid), "00000000-0000-0000-0000-000000000000")]

        public Guid? ShippingTypeId { get; set; }

        [DefaultValue(typeof(Guid), "00000000-0000-0000-0000-000000000000")]

        public Guid? PaymentMethodId { get; set; }

        [DefaultValue(typeof(Guid), "00000000-0000-0000-0000-000000000000")]

        public Guid? SubscriptionPackageId { get; set; }

        public PackageInfoDto? PackageInfo { get; set; }

   
        }
    
}
