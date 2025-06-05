using System.ComponentModel.DataAnnotations;

namespace _ProjetoEdenz.Models
{
    public class Obra
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public int IdUsuario { get; set; }
        
        public Usuario? Usuario { get; set; }
        [Required]
        public  int IdEngenheiro { get; set; }
      
        public Engenheiro? Engenheiro { get; set; }
        [Required]
        public int IdStatus { get; set; }
      
        public Status? Status { get; set; }

         [Required]
        public  int IdTrilho { get; set; }
        public Trilho? Trilho { get; set; }

        [Required(ErrorMessage = "Este campo é obrigatório.")]
        [MaxLength(15, ErrorMessage = "A quantidade precisa ter no máximo 15 caracteres.")]
        [MinLength(1, ErrorMessage = "A quantidade precisa ter no mínimo 4 caracter.")]
        public string TrilhoQtd { get; set; }

         [Required(ErrorMessage = "Este campo é obrigatório.")]
        [MaxLength(50, ErrorMessage = "O nome precisa ter no máximo 50 caracteres.")]
        [MinLength(4, ErrorMessage = "O nome precisa ter no mínimo 4 caracteres.")]
        public  string Nome { get; set; }

         [Required(ErrorMessage = "Este campo é obrigatório.")]
        [MaxLength(50, ErrorMessage = "A localização precisa ter no máximo 50 caracteres.")]
        [MinLength(2, ErrorMessage = "A localização precisa ter no mínimo 2 caracteres.")]
        public  string Localizacao { get; set; }
         [Required(ErrorMessage = "Este campo é obrigatório.")]
        public DateTime DataInicio { get; set; }
         [Required(ErrorMessage = "Este campo é obrigatório.")]
        public DateTime DataFim { get; set; }

        [Required(ErrorMessage = "Este campo é obrigatório.")]
        public  double CustoPrevisto { get; set; }

        [Required(ErrorMessage = "Este campo é obrigatório.")]
        public  double CustoReal { get; set; }

        [Required(ErrorMessage = "Este campo é obrigatório.")]
        [MaxLength(20, ErrorMessage = "A complexidade precisa ter no máximo 20 caracteres.")]
        [MinLength(1, ErrorMessage = "A complexidade precisa ter no mínimo 1 caracter.")]
        public  string Complexidade { get; set; }

        [Required(ErrorMessage = "Este campo é obrigatório.")]
        [MaxLength(30, ErrorMessage = "O impacto ambiental precisa ter no máximo 30 caracteres.")]
        [MinLength(1, ErrorMessage = "O impacto ambiental precisa ter no mínimo 1 caracter.")]
        public  string ImpactoAmbiental { get; set; }

        [Required(ErrorMessage = "Este campo é obrigatório.")]
        [MaxLength(100, ErrorMessage = "A descrição precisa ter no máximo 100 caracteres.")]
        [MinLength(1, ErrorMessage = "A descrição precisa ter no mínimo 1 caracter.")]
        public  string Descricao { get; set; }
    }
}