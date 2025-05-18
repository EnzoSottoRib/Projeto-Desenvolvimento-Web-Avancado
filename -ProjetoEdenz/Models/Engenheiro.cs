using System.ComponentModel.DataAnnotations;

namespace _ProjetoEdenz.Models
{
    public class Engenheiro
    {
        [Key]
        public required int Id { get; set; }

        [Required(ErrorMessage = "Este campo é obrigatório.")]
        [MaxLength(50, ErrorMessage = "O nome precisa ter no máximo 50 caracteres.")]
        [MinLength(4, ErrorMessage = "O nome precisa ter no mínimo 4 caracteres.")]
        public required string Nome { get; set; }
        
        [Required(ErrorMessage = "Este campo é obrigatório.")]
        [MaxLength(14, ErrorMessage = "O cpf precisa ter no máximo 14 caracteres.")]
        [MinLength(8, ErrorMessage = "O cpf precisa ter no mínimo 8 caracteres.")]
        public required string Cpf { get; set; }

        [Required(ErrorMessage = "Este campo é obrigatório.")]
        [MaxLength(13, ErrorMessage = "A data de nascimento precisa ter no máximo 13 caracteres.")]
        [MinLength(7, ErrorMessage = "A data de nascimento precisa ter no mínimo 7 caracteres.")]
        public required string dataNascimento { get; set; }

        [Required(ErrorMessage = "Este campo é obrigatório.")]
        [MaxLength(15, ErrorMessage = "O registro CREA precisa ter no máximo 15 caracteres.")]
        [MinLength(5, ErrorMessage = "O registro CREA precisa ter no mínimo 5 caracteres.")]
        public required string RegistroCREA { get; set; }

        [Required(ErrorMessage = "Este campo é obrigatório.")]
        [MaxLength(20, ErrorMessage = "O contato precisa ter no máximo 20 caracteres.")]
        [MinLength(5, ErrorMessage = "O contato precisa ter no mínimo 5 caracteres.")]
        public required string Contato { get; set; }
    }
}