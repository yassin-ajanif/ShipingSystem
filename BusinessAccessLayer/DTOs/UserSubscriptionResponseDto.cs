namespace BusinessAccessLayer.DTOs
{
    public class UserSubscriptionResponseDto
    {
        public Guid SubscriptionId { get; set; }
        public Guid UserId { get; set; }
        public Guid PackageId { get; set; }
        public string PackageName { get; set; } = string.Empty;
        public DateTime SubscriptionDate { get; set; }
    }
}