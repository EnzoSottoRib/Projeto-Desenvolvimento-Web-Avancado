using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace _ProjetoEdenz.Migrations
{
    /// <inheritdoc />
    public partial class ModificandoMAnutencao : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "MaterialId",
                table: "Manutencoes",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Manutencoes_MaterialId",
                table: "Manutencoes",
                column: "MaterialId");

            migrationBuilder.AddForeignKey(
                name: "FK_Manutencoes_Materiais_MaterialId",
                table: "Manutencoes",
                column: "MaterialId",
                principalTable: "Materiais",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Manutencoes_Materiais_MaterialId",
                table: "Manutencoes");

            migrationBuilder.DropIndex(
                name: "IX_Manutencoes_MaterialId",
                table: "Manutencoes");

            migrationBuilder.DropColumn(
                name: "MaterialId",
                table: "Manutencoes");
        }
    }
}
