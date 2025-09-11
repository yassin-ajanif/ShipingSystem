using System;
using System.ComponentModel.DataAnnotations;

namespace Domains.DTOs
{
    public class CityDto : BaseDto
    {


        [StringLength(10)]
        public string? CityAName { get; set; }

        [StringLength(10)]
        public string? CityEName { get; set; }
    }
}  
