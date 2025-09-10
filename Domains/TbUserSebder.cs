﻿using System;
using System.Collections.Generic;

namespace Domains;
public partial class TbUserSebder : Base
{

    public Guid UserId { get; set; }

    public string SenderName { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string Phone { get; set; } = null!;

    public Guid CityId { get; set; }

    public string Address { get; set; } = null!;

    public virtual TbCity City { get; set; } = null!;

    public virtual ICollection<TbShippment> TbShippments { get; set; } = new List<TbShippment>();
}
