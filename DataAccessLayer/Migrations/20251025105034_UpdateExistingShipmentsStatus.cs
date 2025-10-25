using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DataAccessLayer.Migrations
{
    /// <inheritdoc />
    public partial class UpdateExistingShipmentsStatus : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // Update all existing shipments with null StatusShipmentId to "Created" status (Id = 1)
            migrationBuilder.Sql(
                "UPDATE TbShippments SET StatusShipmentId = 1 WHERE StatusShipmentId IS NULL");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            // Rollback: Set StatusShipmentId back to null for records that were updated
            // Note: This assumes these records were originally null
            migrationBuilder.Sql(
                "UPDATE TbShippments SET StatusShipmentId = NULL WHERE StatusShipmentId = 1");
        }
    }
}
