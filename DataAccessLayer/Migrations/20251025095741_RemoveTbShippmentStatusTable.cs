using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DataAccessLayer.Migrations
{
    /// <inheritdoc />
    public partial class RemoveTbShippmentStatusTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "TbShippmentStatus");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "TbShippmentStatus",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false, defaultValueSql: "(newid())"),
                    CarrierId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ShippmentId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    CreatedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime", nullable: false),
                    CurrentState = table.Column<int>(type: "int", nullable: false),
                    Notes = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UpdatedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    UpdatedDate = table.Column<DateTime>(type: "datetime", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TbShippmentStatus", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TbShippmentStatus_TbCarriers",
                        column: x => x.CarrierId,
                        principalTable: "TbCarriers",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_TbShippmentStatus_TbShippments",
                        column: x => x.ShippmentId,
                        principalTable: "TbShippments",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_TbShippmentStatus_CarrierId",
                table: "TbShippmentStatus",
                column: "CarrierId");

            migrationBuilder.CreateIndex(
                name: "IX_TbShippmentStatus_ShippmentId",
                table: "TbShippmentStatus",
                column: "ShippmentId");
        }
    }
}
