using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DataAccessLayer.Migrations
{
    /// <inheritdoc />
    public partial class MakeStatusShipmentIdRequired : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TbShippments_TbStatusShipments",
                table: "TbShippments");

            migrationBuilder.AlterColumn<byte>(
                name: "StatusShipmentId",
                table: "TbShippments",
                type: "tinyint",
                nullable: false,
                defaultValue: (byte)0,
                oldClrType: typeof(byte),
                oldType: "tinyint",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_TbShippments_TbStatusShipments",
                table: "TbShippments",
                column: "StatusShipmentId",
                principalTable: "TbStatusShipments",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TbShippments_TbStatusShipments",
                table: "TbShippments");

            migrationBuilder.AlterColumn<byte>(
                name: "StatusShipmentId",
                table: "TbShippments",
                type: "tinyint",
                nullable: true,
                oldClrType: typeof(byte),
                oldType: "tinyint");

            migrationBuilder.AddForeignKey(
                name: "FK_TbShippments_TbStatusShipments",
                table: "TbShippments",
                column: "StatusShipmentId",
                principalTable: "TbStatusShipments",
                principalColumn: "Id");
        }
    }
}
