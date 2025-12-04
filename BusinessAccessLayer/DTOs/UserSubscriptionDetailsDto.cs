using System;

namespace BusinessAccessLayer.DTOs
{
    public class UserSubscriptionDetailsDto
    {
        public Guid SubscriptionId { get; set; }
        public Guid UserId { get; set; }
        public Guid PackageId { get; set; }
        public string PackageName { get; set; } = string.Empty;
        public DateTime SubscriptionDate { get; set; }
    }
}
