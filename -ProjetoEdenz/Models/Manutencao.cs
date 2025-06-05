using System.ComponentModel.DataAnnotations;

namespace _ProjetoEdenz.Models
{
    public class Manutencao

    {
        [Key]
        public int Id { get; set; }
        
        [Required]
        public  int IdObra { get; set; }
        
        public Obra? Obra { get; set; }
        
        [Required]
        public  int IdMaterial { get; set; }

        public Material? Material { get; set; }
        
         [Required(ErrorMessage = "Este campo é obrigatório.")]
        [MaxLength(50, ErrorMessage = "O nome precisa ter no máximo 50 caracteres.")]
        [MinLength(4, ErrorMessage = "O nome precisa ter no mínimo 4 caracteres.")]
        public  string Nome { get; set; }

        public List<Material>? Materiais { get; set; } = new();

        [Required(ErrorMessage = "Este campo é obrigatório.")]
        [MaxLength(15, ErrorMessage = "A quantidade precisa ter no máximo 15 caracteres.")]
        [MinLength(1, ErrorMessage = "A quantidade precisa ter no mínimo 4 caracter.")]
        public  string MaterialQtd { get; set; }

        [Required]
        public  int IdEquipamento { get; set; }
        public Equipamento? Equipamento { get; set; }

        [Required(ErrorMessage = "Este campo é obrigatório.")]
        [MaxLength(15, ErrorMessage = "A quantidade precisa ter no máximo 15 caracteres.")]
        [MinLength(1, ErrorMessage = "A quantidade precisa ter no mínimo 4 caracter.")]
        public string EquipamentoQtd { get; set; }


        [Required(ErrorMessage = "Este campo é obrigatório.")]
        [MaxLength(100, ErrorMessage = "A descrição precisa ter no máximo 100 caracteres.")]
        [MinLength(1, ErrorMessage = "A descrição precisa ter no mínimo 1 caracter.")]
        public  string descricao { get; set; }
        
         [Required(ErrorMessage = "Este campo é obrigatório.")]
        [MaxLength(13, ErrorMessage = "A data precisa ter no máximo 13 caracteres.")]
        [MinLength(7, ErrorMessage = "A data precisa ter no mínimo 7 caracteres.")]
        public  string Data { get; set; }
    }
}