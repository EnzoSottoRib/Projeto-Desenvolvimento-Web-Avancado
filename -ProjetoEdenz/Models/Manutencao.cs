using System.ComponentModel.DataAnnotations;

namespace _ProjetoEdenz.Models
{
    public class Manutencao

    {
        [Key]
        public required int Id { get; set; }
        
        [Required]
        public required int IdObra { get; set; }
        [Required]
        public required Obra Obra { get; set; }
        
        [Required]
        public required int IdMaterial { get; set; }
        [Required]
        public required List<Material> Materiais { get; set; } = new();

        [Required(ErrorMessage = "Este campo é obrigatório.")]
        [MaxLength(15, ErrorMessage = "A quantidade precisa ter no máximo 15 caracteres.")]
        [MinLength(1, ErrorMessage = "A quantidade precisa ter no mínimo 4 caracter.")]
        public required string MaterialQtd { get; set; }

        [Required]
        public required int IdEquipamento { get; set; }
        [Required]
        public required Equipamento Equipamento { get; set; }

         [Required(ErrorMessage = "Este campo é obrigatório.")]
        [MaxLength(15, ErrorMessage = "A quantidade precisa ter no máximo 15 caracteres.")]
        [MinLength(1, ErrorMessage = "A quantidade precisa ter no mínimo 4 caracter.")]
        public required string EquipamentoQtd { get; set; }

        [Required]
        public required int IdTrilho { get; set; }
        [Required]
        public required Trilho Trilho { get; set; }

         [Required(ErrorMessage = "Este campo é obrigatório.")]
        [MaxLength(15, ErrorMessage = "A quantidade precisa ter no máximo 15 caracteres.")]
        [MinLength(1, ErrorMessage = "A quantidade precisa ter no mínimo 4 caracter.")]
        public required string TrilhoQtd { get; set; }

        [Required(ErrorMessage = "Este campo é obrigatório.")]
        [MaxLength(100, ErrorMessage = "A descrição precisa ter no máximo 100 caracteres.")]
        [MinLength(1, ErrorMessage = "A descrição precisa ter no mínimo 1 caracter.")]
        public required string descricao { get; set; }
        
         [Required(ErrorMessage = "Este campo é obrigatório.")]
        [MaxLength(13, ErrorMessage = "A data precisa ter no máximo 13 caracteres.")]
        [MinLength(7, ErrorMessage = "A data precisa ter no mínimo 7 caracteres.")]
        public required string Data { get; set; }
    }
}