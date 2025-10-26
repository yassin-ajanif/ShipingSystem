using System;
using System.Collections.Generic;

namespace Domains;
public partial class TbShippment : Base
{
    public Guid Id { get; set; }

    public Guid SenderId { get; set; }
    public virtual TbUserSebder Sender { get; set; } = null!;


    public Guid ReceiverId { get; set; }
    public virtual TbUserReceiver Receiver { get; set; } = null!;


    public Guid? PaymentMethodId { get; set; }
    public virtual TbPaymentMethod? PaymentMethod { get; set; }


    public Guid ShippingTypeId { get; set; }
    public virtual TbShippingType ShippingType { get; set; } = null!;


    public Guid SubscriptionPackageID { get; set; }
    public virtual TbSubscriptionPackage SubscriptionPackage { get; set; } = null!;


    public byte StatusShipmentId { get; set; }
    public virtual TbStatusShipment StatusShipment { get; set; } = null!;


    public double? TrackingNumber { get; set; }
    public Guid? ReferenceId { get; set; }

    

    

    
    

}
