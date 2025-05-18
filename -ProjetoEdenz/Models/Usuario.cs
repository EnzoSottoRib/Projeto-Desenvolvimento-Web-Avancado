using System.ComponentModel.DataAnnotations;

namespace _ProjetoEdenz.Models
{
    public class Usuario
    {
        [Key]
        public required int Id { get; set; }

        [Required(ErrorMessage = "Este campo é obrigatório.")]
        [MaxLength(50, ErrorMessage = "O nome precisa ter no máximo 50 caracteres.")]
        [MinLength(2, ErrorMessage = "O nome precisa ter no mínimo 2 caracteres.")]  
        public required string Nome { get; set; }

        [Required(ErrorMessage = "Este campo é obrigatório.")]
        [MaxLength(50, ErrorMessage = "O email precisa ter no máximo 40 caracteres.")]
        [MinLength(5, ErrorMessage = "O email precisa ter no mínimo 5 caracteres.")]  
        public required string Email { get; set; }

        [Required(ErrorMessage = "Este campo é obrigatório.")]
        [MaxLength(30, ErrorMessage = "A senha precisa ter no máximo 30 caracteres.")]
        [MinLength(8, ErrorMessage = "A senha precisa ter no mínimo 8 caracteres.")]  
        public required string Senha { get; set; }

        [Required(ErrorMessage = "Este campo é obrigatório.")]
        [MaxLength(13, ErrorMessage = "A data de nascimento precisa ter no máximo 13 caracteres.")]
        [MinLength(7, ErrorMessage = "A data de nascimento precisa ter no mínimo 7 caracteres.")]
        public required string Cpf { get; set; }
    }
}