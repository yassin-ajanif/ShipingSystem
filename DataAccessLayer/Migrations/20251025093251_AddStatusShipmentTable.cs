using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DataAccessLayer.Migrations
{
    /// <inheritdoc />
    public partial class AddStatusShipmentTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<byte>(
                name: "StatusShipmentId",
                table: "TbShippments",
                type: "tinyint",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "TbStatusShipments",
                columns: table => new
                {
                    Id = table.Column<byte>(type: "tinyint", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TbStatusShipments", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_TbShippments_StatusShipmentId",
                table: "TbShippments",
                column: "StatusShipmentId");

            migrationBuilder.AddForeignKey(
                name: "FK_TbShippments_TbStatusShipments",
                table: "TbShippments",
                column: "StatusShipmentId",
                principalTable: "TbStatusShipments",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TbShippments_TbStatusShipments",
                table: "TbShippments");

            migrationBuilder.DropTable(
                name: "TbStatusShipments");

            migrationBuilder.DropIndex(
                name: "IX_TbShippments_StatusShipmentId",
                table: "TbShippments");

            migrationBuilder.DropColumn(
                name: "StatusShipmentId",
                table: "TbShippments");
        }
    }
}
