using System.ComponentModel.DataAnnotations;

namespace _ProjetoEdenz.Models
{
    public class Obra
    {
        [Key]
        public required int Id { get; set; }
        [Required]
        public required int IdUsuario { get; set; }
        [Required]
        public required Usuario Usuario { get; set; }
        [Required]
        public required int IdEngenheiro { get; set; }
        [Required]
        public required Engenheiro Engenheiro { get; set; }
        public required int IdStatus { get; set; }
        [Required]
        public required Status Status { get; set; }

         [Required(ErrorMessage = "Este campo é obrigatório.")]
        [MaxLength(50, ErrorMessage = "O nome precisa ter no máximo 50 caracteres.")]
        [MinLength(4, ErrorMessage = "O nome precisa ter no mínimo 4 caracteres.")]
        public required string Nome { get; set; }

         [Required(ErrorMessage = "Este campo é obrigatório.")]
        [MaxLength(50, ErrorMessage = "A localização precisa ter no máximo 50 caracteres.")]
        [MinLength(2, ErrorMessage = "A localização precisa ter no mínimo 2 caracteres.")]
        public required string Localização { get; set; }
         [Required(ErrorMessage = "Este campo é obrigatório.")]
        [MaxLength(13, ErrorMessage = "A data precisa ter no máximo 13 caracteres.")]
        [MinLength(7, ErrorMessage = "A data precisa ter no mínimo 7 caracteres.")]

        public required string DataInicio { get; set; }
         [Required(ErrorMessage = "Este campo é obrigatório.")]
        [MaxLength(13, ErrorMessage = "A data precisa ter no máximo 13 caracteres.")]
        [MinLength(7, ErrorMessage = "A data precisa ter no mínimo 7 caracteres.")]
        public required string DataFim { get; set; }

        [Required(ErrorMessage = "Este campo é obrigatório.")]
        [MaxLength(20, ErrorMessage = "O custo previsto precisa ter no máximo 20 caracteres.")]
        [MinLength(1, ErrorMessage = "O custo previsto precisa ter no mínimo 1 caracter.")]
        public required double CustoPrevisto { get; set; }

        [Required(ErrorMessage = "Este campo é obrigatório.")]
        [MaxLength(20, ErrorMessage = "O custo real precisa ter no máximo 20 caracteres.")]
        [MinLength(1, ErrorMessage = "O custo real precisa ter no mínimo 1 caracter.")]
        public required double CustoReal { get; set; }

        [Required(ErrorMessage = "Este campo é obrigatório.")]
        [MaxLength(20, ErrorMessage = "A complexidade precisa ter no máximo 20 caracteres.")]
        [MinLength(1, ErrorMessage = "A complexidade precisa ter no mínimo 1 caracter.")]
        public required string Complexidade { get; set; }

        [Required(ErrorMessage = "Este campo é obrigatório.")]
        [MaxLength(30, ErrorMessage = "O impacto ambiental precisa ter no máximo 30 caracteres.")]
        [MinLength(1, ErrorMessage = "O impacto ambiental precisa ter no mínimo 1 caracter.")]
        public required string ImpactoAmbiental { get; set; }

        [Required(ErrorMessage = "Este campo é obrigatório.")]
        [MaxLength(100, ErrorMessage = "A descrição precisa ter no máximo 100 caracteres.")]
        [MinLength(1, ErrorMessage = "A descrição precisa ter no mínimo 1 caracter.")]
        public required string Descricao { get; set; }
    }
}