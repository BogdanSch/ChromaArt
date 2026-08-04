using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ChromaArt.Server.Migrations
{
    /// <inheritdoc />
    public partial class PricingCategoryUpdate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Price",
                table: "PricingCategories",
                newName: "StartingPrice");

            migrationBuilder.AddColumn<int>(
                name: "Category",
                table: "SiteSettings",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Category",
                table: "SiteSettings");

            migrationBuilder.RenameColumn(
                name: "StartingPrice",
                table: "PricingCategories",
                newName: "Price");
        }
    }
}
