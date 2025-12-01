using Swashbuckle.AspNetCore.Annotations;
using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace BusinessAccessLayer.DTOs.Shipment
{
    public class ShippmentDto : BaseDto
    {

       
        
        public Guid SenderId { get; set; }
        public UserSenderDto Sender { get; set; }
  
        
        
      
        public Guid ReceiverId { get; set; }
        public UserReceiverDto Receiver { get; set; }

        
        
      
        public Guid ShippingTypeId { get; set; }
        public ShippingTypeDto ShippingType { get; set; }



        public Guid? PaymentMethodId { get; set; }
        public PaymentMethodDto PaymentMethod { get; set; }



    
        public Guid SubscriptionPackageID { get; set; }
        public SubscriptionPackageDto SubscriptionPackage { get; set; }

        public byte StatusShipmentId { get; set;}

        public Guid PackageInfoId { get; set; }

    
      


    }
}
