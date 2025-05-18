using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace _ProjetoEdenz.Migrations
{
    /// <inheritdoc />
    public partial class Atualizando : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Manutencao_Equipamento_EquipamentoId",
                table: "Manutencao");

            migrationBuilder.DropForeignKey(
                name: "FK_Manutencao_Material_MaterialId",
                table: "Manutencao");

            migrationBuilder.DropForeignKey(
                name: "FK_Manutencao_Obra_ObraId",
                table: "Manutencao");

            migrationBuilder.DropForeignKey(
                name: "FK_Manutencao_Trilho_TrilhoId",
                table: "Manutencao");

            migrationBuilder.DropForeignKey(
                name: "FK_Obra_Engenheiro_EngenheiroId",
                table: "Obra");

            migrationBuilder.DropForeignKey(
                name: "FK_Obra_Status_StatusId",
                table: "Obra");

            migrationBuilder.DropForeignKey(
                name: "FK_Obra_Usuario_UsuarioId",
                table: "Obra");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Usuario",
                table: "Usuario");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Trilho",
                table: "Trilho");

            migrationBuilder.DropPrimaryKey(
                name: "PK_TipoManutencao",
                table: "TipoManutencao");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Obra",
                table: "Obra");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Material",
                table: "Material");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Manutencao",
                table: "Manutencao");

            migrationBuilder.DropIndex(
                name: "IX_Manutencao_MaterialId",
                table: "Manutencao");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Equipamento",
                table: "Equipamento");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Engenheiro",
                table: "Engenheiro");

            migrationBuilder.DropColumn(
                name: "MaterialId",
                table: "Manutencao");

            migrationBuilder.RenameTable(
                name: "Usuario",
                newName: "Usuarios");

            migrationBuilder.RenameTable(
                name: "Trilho",
                newName: "Trilhos");

            migrationBuilder.RenameTable(
                name: "TipoManutencao",
                newName: "TiposManutencao");

            migrationBuilder.RenameTable(
                name: "Obra",
                newName: "Obras");

            migrationBuilder.RenameTable(
                name: "Material",
                newName: "Materiais");

            migrationBuilder.RenameTable(
                name: "Manutencao",
                newName: "Manutencoes");

            migrationBuilder.RenameTable(
                name: "Equipamento",
                newName: "Equipamentos");

            migrationBuilder.RenameTable(
                name: "Engenheiro",
                newName: "Engenheiros");

            migrationBuilder.RenameIndex(
                name: "IX_Obra_UsuarioId",
                table: "Obras",
                newName: "IX_Obras_UsuarioId");

            migrationBuilder.RenameIndex(
                name: "IX_Obra_StatusId",
                table: "Obras",
                newName: "IX_Obras_StatusId");

            migrationBuilder.RenameIndex(
                name: "IX_Obra_EngenheiroId",
                table: "Obras",
                newName: "IX_Obras_EngenheiroId");

            migrationBuilder.RenameIndex(
                name: "IX_Manutencao_TrilhoId",
                table: "Manutencoes",
                newName: "IX_Manutencoes_TrilhoId");

            migrationBuilder.RenameIndex(
                name: "IX_Manutencao_ObraId",
                table: "Manutencoes",
                newName: "IX_Manutencoes_ObraId");

            migrationBuilder.RenameIndex(
                name: "IX_Manutencao_EquipamentoId",
                table: "Manutencoes",
                newName: "IX_Manutencoes_EquipamentoId");

            migrationBuilder.AddColumn<int>(
                name: "ManutencaoId",
                table: "Materiais",
                type: "int",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Usuarios",
                table: "Usuarios",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Trilhos",
                table: "Trilhos",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_TiposManutencao",
                table: "TiposManutencao",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Obras",
                table: "Obras",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Materiais",
                table: "Materiais",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Manutencoes",
                table: "Manutencoes",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Equipamentos",
                table: "Equipamentos",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Engenheiros",
                table: "Engenheiros",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_Materiais_ManutencaoId",
                table: "Materiais",
                column: "ManutencaoId");

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
                name: "FK_Materiais_Manutencoes_ManutencaoId",
                table: "Materiais",
                column: "ManutencaoId",
                principalTable: "Manutencoes",
                principalColumn: "Id");

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
                name: "FK_Materiais_Manutencoes_ManutencaoId",
                table: "Materiais");

            migrationBuilder.DropForeignKey(
                name: "FK_Obras_Engenheiros_EngenheiroId",
                table: "Obras");

            migrationBuilder.DropForeignKey(
                name: "FK_Obras_Status_StatusId",
                table: "Obras");

            migrationBuilder.DropForeignKey(
                name: "FK_Obras_Usuarios_UsuarioId",
                table: "Obras");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Usuarios",
                table: "Usuarios");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Trilhos",
                table: "Trilhos");

            migrationBuilder.DropPrimaryKey(
                name: "PK_TiposManutencao",
                table: "TiposManutencao");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Obras",
                table: "Obras");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Materiais",
                table: "Materiais");

            migrationBuilder.DropIndex(
                name: "IX_Materiais_ManutencaoId",
                table: "Materiais");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Manutencoes",
                table: "Manutencoes");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Equipamentos",
                table: "Equipamentos");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Engenheiros",
                table: "Engenheiros");

            migrationBuilder.DropColumn(
                name: "ManutencaoId",
                table: "Materiais");

            migrationBuilder.RenameTable(
                name: "Usuarios",
                newName: "Usuario");

            migrationBuilder.RenameTable(
                name: "Trilhos",
                newName: "Trilho");

            migrationBuilder.RenameTable(
                name: "TiposManutencao",
                newName: "TipoManutencao");

            migrationBuilder.RenameTable(
                name: "Obras",
                newName: "Obra");

            migrationBuilder.RenameTable(
                name: "Materiais",
                newName: "Material");

            migrationBuilder.RenameTable(
                name: "Manutencoes",
                newName: "Manutencao");

            migrationBuilder.RenameTable(
                name: "Equipamentos",
                newName: "Equipamento");

            migrationBuilder.RenameTable(
                name: "Engenheiros",
                newName: "Engenheiro");

            migrationBuilder.RenameIndex(
                name: "IX_Obras_UsuarioId",
                table: "Obra",
                newName: "IX_Obra_UsuarioId");

            migrationBuilder.RenameIndex(
                name: "IX_Obras_StatusId",
                table: "Obra",
                newName: "IX_Obra_StatusId");

            migrationBuilder.RenameIndex(
                name: "IX_Obras_EngenheiroId",
                table: "Obra",
                newName: "IX_Obra_EngenheiroId");

            migrationBuilder.RenameIndex(
                name: "IX_Manutencoes_TrilhoId",
                table: "Manutencao",
                newName: "IX_Manutencao_TrilhoId");

            migrationBuilder.RenameIndex(
                name: "IX_Manutencoes_ObraId",
                table: "Manutencao",
                newName: "IX_Manutencao_ObraId");

            migrationBuilder.RenameIndex(
                name: "IX_Manutencoes_EquipamentoId",
                table: "Manutencao",
                newName: "IX_Manutencao_EquipamentoId");

            migrationBuilder.AddColumn<int>(
                name: "MaterialId",
                table: "Manutencao",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Usuario",
                table: "Usuario",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Trilho",
                table: "Trilho",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_TipoManutencao",
                table: "TipoManutencao",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Obra",
                table: "Obra",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Material",
                table: "Material",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Manutencao",
                table: "Manutencao",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Equipamento",
                table: "Equipamento",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Engenheiro",
                table: "Engenheiro",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_Manutencao_MaterialId",
                table: "Manutencao",
                column: "MaterialId");

            migrationBuilder.AddForeignKey(
                name: "FK_Manutencao_Equipamento_EquipamentoId",
                table: "Manutencao",
                column: "EquipamentoId",
                principalTable: "Equipamento",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Manutencao_Material_MaterialId",
                table: "Manutencao",
                column: "MaterialId",
                principalTable: "Material",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Manutencao_Obra_ObraId",
                table: "Manutencao",
                column: "ObraId",
                principalTable: "Obra",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Manutencao_Trilho_TrilhoId",
                table: "Manutencao",
                column: "TrilhoId",
                principalTable: "Trilho",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Obra_Engenheiro_EngenheiroId",
                table: "Obra",
                column: "EngenheiroId",
                principalTable: "Engenheiro",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Obra_Status_StatusId",
                table: "Obra",
                column: "StatusId",
                principalTable: "Status",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Obra_Usuario_UsuarioId",
                table: "Obra",
                column: "UsuarioId",
                principalTable: "Usuario",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
