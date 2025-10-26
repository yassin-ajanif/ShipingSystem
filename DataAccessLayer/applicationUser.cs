using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domains;

namespace DataAccessLayer
{
    public class applicationUser : IdentityUser
    {

        public string FirstName { get; set; } 

        public string LastName { get; set; } 

        public string Phone { get; set; } 

   
    }
}
