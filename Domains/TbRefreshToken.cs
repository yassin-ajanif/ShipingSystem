﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domains
{
    public class TbRefreshToken : Base
    {
        public string UserId { get; set; }
        public string Token { get; set; }
        public DateTime Expires { get; set; }

    }
}
