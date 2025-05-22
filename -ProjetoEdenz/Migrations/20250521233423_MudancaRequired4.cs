using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace _ProjetoEdenz.Migrations
{
    /// <inheritdoc />
    public partial class MudancaRequired4 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Manutencoes_Equipamentos_EquipamentoId",
                table: "Manutencoes");

            migrationBuilder.DropForeignKey(
                name: "FK_Manutencoes_Obras_ObraId",
                table: "Manutencoes");

            migrationBuilder.DropForeignKey(
                name: "FK_Manutencoes_Trilhos_TrilhoId",
                table: "Manutencoes");

            migrationBuilder.DropForeignKey(
                name: "FK_Obras_Engenheiros_EngenheiroId",
                table: "Obras");

            migrationBuilder.DropForeignKey(
                name: "FK_Obras_Status_StatusId",
                table: "Obras");

            migrationBuilder.DropForeignKey(
                name: "FK_Obras_Usuarios_UsuarioId",
                table: "Obras");

            migrationBuilder.AlterColumn<int>(
                name: "UsuarioId",
                table: "Obras",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<int>(
                name: "StatusId",
                table: "Obras",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<int>(
                name: "EngenheiroId",
                table: "Obras",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<int>(
                name: "TrilhoId",
                table: "Manutencoes",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<int>(
                name: "ObraId",
                table: "Manutencoes",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<int>(
                name: "EquipamentoId",
                table: "Manutencoes",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_Manutencoes_Equipamentos_EquipamentoId",
                table: "Manutencoes",
                column: "EquipamentoId",
                principalTable: "Equipamentos",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Manutencoes_Obras_ObraId",
                table: "Manutencoes",
                column: "ObraId",
                principalTable: "Obras",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Manutencoes_Trilhos_TrilhoId",
                table: "Manutencoes",
                column: "TrilhoId",
                principalTable: "Trilhos",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Obras_Engenheiros_EngenheiroId",
                table: "Obras",
                column: "EngenheiroId",
                principalTable: "Engenheiros",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Obras_Status_StatusId",
                table: "Obras",
                column: "StatusId",
                principalTable: "Status",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Obras_Usuarios_UsuarioId",
                table: "Obras",
                column: "UsuarioId",
                principalTable: "Usuarios",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Manutencoes_Equipamentos_EquipamentoId",
                table: "Manutencoes");

            migrationBuilder.DropForeignKey(
                name: "FK_Manutencoes_Obras_ObraId",
                table: "Manutencoes");

            migrationBuilder.DropForeignKey(
                name: "FK_Manutencoes_Trilhos_TrilhoId",
                table: "Manutencoes");

            migrationBuilder.DropForeignKey(
                name: "FK_Obras_Engenheiros_EngenheiroId",
                table: "Obras");

            migrationBuilder.DropForeignKey(
                name: "FK_Obras_Status_StatusId",
                table: "Obras");

            migrationBuilder.DropForeignKey(
                name: "FK_Obras_Usuarios_UsuarioId",
                table: "Obras");

            migrationBuilder.AlterColumn<int>(
                name: "UsuarioId",
                table: "Obras",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "StatusId",
                table: "Obras",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "EngenheiroId",
                table: "Obras",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "TrilhoId",
                table: "Manutencoes",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "ObraId",
                table: "Manutencoes",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "EquipamentoId",
                table: "Manutencoes",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Manutencoes_Equipamentos_EquipamentoId",
                table: "Manutencoes",
                column: "EquipamentoId",
                principalTable: "Equipamentos",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Manutencoes_Obras_ObraId",
                table: "Manutencoes",
                column: "ObraId",
                principalTable: "Obras",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Manutencoes_Trilhos_TrilhoId",
                table: "Manutencoes",
                column: "TrilhoId",
                principalTable: "Trilhos",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Obras_Engenheiros_EngenheiroId",
                table: "Obras",
                column: "EngenheiroId",
                principalTable: "Engenheiros",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Obras_Status_StatusId",
                table: "Obras",
                column: "StatusId",
                principalTable: "Status",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Obras_Usuarios_UsuarioId",
                table: "Obras",
                column: "UsuarioId",
                principalTable: "Usuarios",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
