using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DataAccessLayer.Migrations
{
    /// <inheritdoc />
    public partial class updateShipmentPaymentTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Height",
                table: "TbShippments");

            migrationBuilder.DropColumn(
                name: "Length",
                table: "TbShippments");

            migrationBuilder.DropColumn(
                name: "PackageValue",
                table: "TbShippments");

            migrationBuilder.DropColumn(
                name: "ShippingRate",
                table: "TbShippments");

            migrationBuilder.DropColumn(
                name: "UserSubscriptionId",
                table: "TbShippments");

            migrationBuilder.DropColumn(
                name: "Weight",
                table: "TbShippments");

            migrationBuilder.DropColumn(
                name: "Width",
                table: "TbShippments");

            migrationBuilder.AddColumn<Guid>(
                name: "SubscriptionPackageID",
                table: "TbShippments",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_TbShippments_SubscriptionPackageID",
                table: "TbShippments",
                column: "SubscriptionPackageID");

            migrationBuilder.AddForeignKey(
                name: "FK_TbShippments_TbSubscriptionPackages_SubscriptionPackageID",
                table: "TbShippments",
                column: "SubscriptionPackageID",
                principalTable: "TbSubscriptionPackages",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TbShippments_TbSubscriptionPackages_SubscriptionPackageID",
                table: "TbShippments");

            migrationBuilder.DropIndex(
                name: "IX_TbShippments_SubscriptionPackageID",
                table: "TbShippments");

            migrationBuilder.DropColumn(
                name: "SubscriptionPackageID",
                table: "TbShippments");

            migrationBuilder.AddColumn<double>(
                name: "Height",
                table: "TbShippments",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Length",
                table: "TbShippments",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<decimal>(
                name: "PackageValue",
                table: "TbShippments",
                type: "decimal(8,4)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "ShippingRate",
                table: "TbShippments",
                type: "decimal(8,4)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<Guid>(
                name: "UserSubscriptionId",
                table: "TbShippments",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "Weight",
                table: "TbShippments",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Width",
                table: "TbShippments",
                type: "float",
                nullable: false,
                defaultValue: 0.0);
        }
    }
}
