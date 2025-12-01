using System;
using System.Collections.Generic;

namespace Domains;

public partial class TbPackageInfo : Base
{
    public string? PackageName { get; set; }
    public string? PackageType { get; set; }
    public string? Length { get; set; }
    public string? Width { get; set; }
    public string? Height { get; set; }
    public string? Weight { get; set; }
    public string? ContentsDescription { get; set; }
}
