using System.ComponentModel.DataAnnotations;

namespace _ProjetoEdenz.Models
{
    public class Status
    {
        [Key]
        public int Id { get; set; }
        
        [Required(ErrorMessage = "Este campo é obrigatório.")]
        [MaxLength(50, ErrorMessage = "O nome precisa ter no máximo 50 caracteres.")]
        [MinLength(2, ErrorMessage = "O nome precisa ter no mínimo 2 caracteres.")]
        public required string Nome { get; set; }
    }
}