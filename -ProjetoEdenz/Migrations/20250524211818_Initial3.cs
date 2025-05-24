using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace _ProjetoEdenz.Migrations
{
    /// <inheritdoc />
    public partial class Initial3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Obras_Trilhos_TrilhoId",
                table: "Obras");

            migrationBuilder.AlterColumn<int>(
                name: "TrilhoId",
                table: "Obras",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_Obras_Trilhos_TrilhoId",
                table: "Obras",
                column: "TrilhoId",
                principalTable: "Trilhos",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Obras_Trilhos_TrilhoId",
                table: "Obras");

            migrationBuilder.AlterColumn<int>(
                name: "TrilhoId",
                table: "Obras",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Obras_Trilhos_TrilhoId",
                table: "Obras",
                column: "TrilhoId",
                principalTable: "Trilhos",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
