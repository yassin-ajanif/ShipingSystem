using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessAccessLayer.DTOs.Shipment
{
    public class ShipmentDataToSendToDbDTO : BaseDto
    {

        public Guid SenderId { get; set; }
        public Guid ReceiverId { get; set; }
        public Guid ShippingTypeId { get; set; }
        public Guid? PaymentMethodId { get; set; }
        public Guid SubscriptionPackageID { get; set; }
        public byte StatusShipmentId { get; set;}

    }
}
