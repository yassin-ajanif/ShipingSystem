using Domains.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessAccessLayer.DTOs
{
    public class TbRefreshTokenDto : BaseDto
    {
        public string UserId { get; set; }
        public string Token { get; set; }
        public DateTime Expires { get; set; }

        public int CurrentState { get; set; }
    }
}
