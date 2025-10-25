using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace DataAccessLayer.Migrations
{
    /// <inheritdoc />
    public partial class SeedTbStatusShipmentData : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "TbStatusShipments",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { (byte)1, "Created" },
                    { (byte)2, "Updated" },
                    { (byte)3, "Deleted" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "TbStatusShipments",
                keyColumn: "Id",
                keyValue: (byte)1);

            migrationBuilder.DeleteData(
                table: "TbStatusShipments",
                keyColumn: "Id",
                keyValue: (byte)2);

            migrationBuilder.DeleteData(
                table: "TbStatusShipments",
                keyColumn: "Id",
                keyValue: (byte)3);
        }
    }
}
