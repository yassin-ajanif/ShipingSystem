﻿using BusinessAccessLayer.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessAccessLayer.DTOs
{
    public class RefreshTokenDto : BaseDto
    {
        public string UserId { get; set; }
        public string Token { get; set; }
        public DateTime Expires { get; set; }

        public int CurrentState { get; set; }
    }
}
