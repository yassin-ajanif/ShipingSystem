using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domains.Views
{
    public class VwShipmentSummary
    {
            public string SenderName { get; set; }
            public string ReceiverName { get; set; }
            public string ReceiverPhone { get; set; }
            public string ShippingTypeAName { get; set; }
            public double TotalWeight { get; set; }
            public double NumberOfKiloMeters { get; set; }
    }
}
