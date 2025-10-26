using System;
using System.Collections.Generic;

namespace Domains;

public partial class TbStatusShipment
{
    public byte Id { get; set; }

    public string Name { get; set; } = null!;

    public virtual ICollection<TbShippment> TbShippments { get; set; } = new List<TbShippment>();
}