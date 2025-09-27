using BusinessAccessLayer.DTOs;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessAccessLayer.DTOs
{
    public class UserDto : BaseDto
    {
        public string Email { get; set; }
 
        public string Password { get; set; }

        public string? ConfirmPassword { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Phone { get; set; }

        public string? Role { get; set; }

        public string? ReturnUrl { get; set; }

    }
}
