using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace BusinessAccessLayer.DTOs
{
    public class SubscriptionPackageDto : BaseDto
    {
      

        [StringLength(1000)]
        [DefaultValue("")]
        public string PackageName { get; set; } = null!;

        [Range(1, int.MaxValue)]
        [DefaultValue(1)]
        public int ShippimentCount { get; set; }

        [Range(1, int.MaxValue)]
        [DefaultValue(1)]
        public double NumberOfKiloMeters { get; set; }

        [Range(1, int.MaxValue)]
        [DefaultValue(1)]
        public double TotalWeight { get; set; }


    }
}