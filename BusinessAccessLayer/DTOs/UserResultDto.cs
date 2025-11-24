using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessAccessLayer.DTOs
{
    public class UserResultDto
    {
        public bool Success { get; set; }
        public string FirstName { get; set; }
        public string accessToken { get; set; }

        public string refreshToken { get; set; }
        public IEnumerable<string> Errors { get; set; }
    }
}
