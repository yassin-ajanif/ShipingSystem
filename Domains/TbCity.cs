﻿using System;
using System.Collections.Generic;

namespace Domains;
public partial class TbCity : Base
{
  

    public string? CityAname { get; set; }

    public string? CityEname { get; set; }

    public Guid CountryId { get; set; }

    public virtual TbCountry Country { get; set; } = null!;

    public virtual ICollection<TbUserReceiver> TbUserReceivers { get; set; } = new List<TbUserReceiver>();

    public virtual ICollection<TbUserSebder> TbUserSebders { get; set; } = new List<TbUserSebder>();
}
