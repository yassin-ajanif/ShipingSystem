using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DataAccessLayer.Migrations
{
    /// <inheritdoc />
    public partial class SyncModelChanges : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "TbStatusShipments",
                keyColumn: "Id",
                keyValue: (byte)1,
                column: "Name",
                value: "Ongoing");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "TbStatusShipments",
                keyColumn: "Id",
                keyValue: (byte)1,
                column: "Name",
                value: "Active");
        }
    }
}
