using System;
using System.ComponentModel.DataAnnotations;

namespace BusinessAccessLayer.DTOs
{
    public class ShippmentStatusDto : BaseDto
    {
        
        public Guid? ShippmentId { get; set; }
        public string? ShippmentInfo { get; set; } // For display
        
        [Required]
        public Guid CarrierId { get; set; }
        public string? CarrierName { get; set; } // For display
        
        [StringLength(500)]
        public string? StatusDescription { get; set; }
        
        
    }
}