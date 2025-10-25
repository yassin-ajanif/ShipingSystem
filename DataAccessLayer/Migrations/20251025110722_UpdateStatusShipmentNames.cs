using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DataAccessLayer.Migrations
{
    /// <inheritdoc />
    public partial class UpdateStatusShipmentNames : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "TbStatusShipments",
                keyColumn: "Id",
                keyValue: (byte)1,
                column: "Name",
                value: "Active");

            migrationBuilder.UpdateData(
                table: "TbStatusShipments",
                keyColumn: "Id",
                keyValue: (byte)2,
                column: "Name",
                value: "Completed");

            migrationBuilder.UpdateData(
                table: "TbStatusShipments",
                keyColumn: "Id",
                keyValue: (byte)3,
                column: "Name",
                value: "Cancelled");

            migrationBuilder.InsertData(
                table: "TbStatusShipments",
                columns: new[] { "Id", "Name" },
                values: new object[] { (byte)4, "Returned" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "TbStatusShipments",
                keyColumn: "Id",
                keyValue: (byte)4);

            migrationBuilder.UpdateData(
                table: "TbStatusShipments",
                keyColumn: "Id",
                keyValue: (byte)1,
                column: "Name",
                value: "Created");

            migrationBuilder.UpdateData(
                table: "TbStatusShipments",
                keyColumn: "Id",
                keyValue: (byte)2,
                column: "Name",
                value: "Updated");

            migrationBuilder.UpdateData(
                table: "TbStatusShipments",
                keyColumn: "Id",
                keyValue: (byte)3,
                column: "Name",
                value: "Deleted");
        }
    }
}
