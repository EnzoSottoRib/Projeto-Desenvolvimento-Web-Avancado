using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace _ProjetoEdenz.Migrations
{
    /// <inheritdoc />
    public partial class alterandoNomeLocal : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Localização",
                table: "Obras",
                newName: "Localizacao");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Localizacao",
                table: "Obras",
                newName: "Localização");
        }
    }
}
