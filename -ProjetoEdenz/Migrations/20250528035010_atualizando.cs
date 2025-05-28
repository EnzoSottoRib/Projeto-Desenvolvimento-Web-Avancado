using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace _ProjetoEdenz.Migrations
{
    /// <inheritdoc />
    public partial class atualizando : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "DataInicio",
                table: "Obras",
                type: "varchar(30)",
                maxLength: 30,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "varchar(13)",
                oldMaxLength: 13)
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AlterColumn<DateTime>(
                name: "DataNascimento",
                table: "Engenheiros",
                type: "datetime(6)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "varchar(13)",
                oldMaxLength: 13)
                .OldAnnotation("MySql:CharSet", "utf8mb4");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "DataInicio",
                table: "Obras",
                type: "varchar(13)",
                maxLength: 13,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "varchar(30)",
                oldMaxLength: 30)
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AlterColumn<string>(
                name: "DataNascimento",
                table: "Engenheiros",
                type: "varchar(13)",
                maxLength: 13,
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "datetime(6)")
                .Annotation("MySql:CharSet", "utf8mb4");
        }
    }
}
