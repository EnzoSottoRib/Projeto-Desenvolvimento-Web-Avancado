using System.ComponentModel.DataAnnotations;

namespace _ProjetoEdenz.Models
{
    public class Manutencao

    {
        [Key]
        public int Id { get; set; }
        
        [Required]
        public int IdObra { get; set; }
        [Required]
        public Obra Obra { get; set; }
        
        [Required]
        public int IdMaterial { get; set; }
        [Required]
        public Material Material { get; set; }

        [Required(ErrorMessage = "Este campo é obrigatório.")]
        [MaxLength(15, ErrorMessage = "A quantidade precisa ter no máximo 15 caracteres.")]
        [MinLength(1, ErrorMessage = "A quantidade precisa ter no mínimo 4 caracter.")]
        public string MaterialQtd { get; set; }

        [Required]
        public int IdEquipamento { get; set; }
        [Required]
        public Equipamento Equipamento { get; set; }

         [Required(ErrorMessage = "Este campo é obrigatório.")]
        [MaxLength(15, ErrorMessage = "A quantidade precisa ter no máximo 15 caracteres.")]
        [MinLength(1, ErrorMessage = "A quantidade precisa ter no mínimo 4 caracter.")]
        public string EquipamentoQtd { get; set; }

        [Required]
        public int IdTrilho { get; set; }
        [Required]
        public Trilho Trilho { get; set; }

         [Required(ErrorMessage = "Este campo é obrigatório.")]
        [MaxLength(15, ErrorMessage = "A quantidade precisa ter no máximo 15 caracteres.")]
        [MinLength(1, ErrorMessage = "A quantidade precisa ter no mínimo 4 caracter.")]
        public string TrilhoQtd { get; set; }

        [Required(ErrorMessage = "Este campo é obrigatório.")]
        [MaxLength(100, ErrorMessage = "A descrição precisa ter no máximo 100 caracteres.")]
        [MinLength(1, ErrorMessage = "A descrição precisa ter no mínimo 1 caracter.")]
        public string descricao { get; set; }
        
         [Required(ErrorMessage = "Este campo é obrigatório.")]
        [MaxLength(13, ErrorMessage = "A data precisa ter no máximo 13 caracteres.")]
        [MinLength(7, ErrorMessage = "A data precisa ter no mínimo 7 caracteres.")]
        public string Data { get; set; }
    }
}