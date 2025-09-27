using System;
using System.ComponentModel;


namespace BusinessAccessLayer.DTOs
{
    
    public class BaseDto
    {
        [DefaultValue(typeof(Guid), "00000000-0000-0000-0000-000000000000")]
        public Guid Id { get; set; } 

    }
}