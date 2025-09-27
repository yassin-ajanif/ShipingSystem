using System;
using System.ComponentModel.DataAnnotations;

namespace BusinessAccessLayer.DTOs
{
    public class CountryDto : BaseDto
    {
        
        [StringLength(200)]
        public string? CountryAName { get; set; }
        
        [StringLength(200)]
        public string? CountryEName { get; set; }
  
    }
}