using System;
using System.ComponentModel.DataAnnotations;

namespace BusinessAccessLayer.DTOs
{
    public class PackageInfoDto : BaseDto
    {
        [StringLength(200)]
        public string? PackageName { get; set; }

        [StringLength(200)]
        public string? PackageType { get; set; }

        [StringLength(50)]
        public string? Length { get; set; }

        [StringLength(50)]
        public string? Width { get; set; }

        [StringLength(50)]
        public string? Height { get; set; }

        [StringLength(50)]
        public string? Weight { get; set; }

        [StringLength(1000)]
        public string? ContentsDescription { get; set; }
    }
}
