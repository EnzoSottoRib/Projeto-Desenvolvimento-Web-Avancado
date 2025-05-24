using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace _ProjetoEdenz.Migrations
{
    /// <inheritdoc />
    public partial class Initial2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TrilhoQtd",
                table: "Manutencoes");

            migrationBuilder.AddColumn<string>(
                name: "TrilhoQtd",
                table: "Obras",
                type: "varchar(15)",
                maxLength: 15,
                nullable: false,
                defaultValue: "")
                .Annotation("MySql:CharSet", "utf8mb4");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TrilhoQtd",
                table: "Obras");

            migrationBuilder.AddColumn<string>(
                name: "TrilhoQtd",
                table: "Manutencoes",
                type: "varchar(15)",
                maxLength: 15,
                nullable: false,
                defaultValue: "")
                .Annotation("MySql:CharSet", "utf8mb4");
        }
    }
}
