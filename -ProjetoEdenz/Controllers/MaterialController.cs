using _ProjetoEdenz.Data;
using _ProjetoEdenz.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace _ProjetoEdenz.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MaterialController : ControllerBase
    {
        private readonly AppDbContext _appDbContext;

        public MaterialController(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        [HttpPost]
        public async Task<IActionResult> AddMaterial(Material material)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _appDbContext.Materiais.Add(material);
            await _appDbContext.SaveChangesAsync();

            return CreatedAtAction(nameof(GetMaterial), new { id = material.Id }, material);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Material>>> GetMaterial()
        {
            var materiais = await _appDbContext.Materiais.ToListAsync();
            return Ok(materiais);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Material>> GetMaterial(int id)
        {
            var material = await _appDbContext.Materiais.FindAsync(id);

            if (material == null)
            {
                return NotFound("Material não encontrado!");
            }

            return Ok(material);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateMaterial(int id, [FromBody] Material materialAtualizado)
        {
            if (id != materialAtualizado.Id)
            {
                return BadRequest("ID da URL e do objeto não conferem.");
            }

            var materialExistente = await _appDbContext.Materiais.FindAsync(id);

            if (materialExistente == null)
            {
                return NotFound("Material não encontrado!");
            }

            _appDbContext.Entry(materialExistente).CurrentValues.SetValues(materialAtualizado);
            await _appDbContext.SaveChangesAsync();

            return NoContent(); // 204: atualizado com sucesso, sem conteúdo para retornar
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteMaterial(int id)
        {
            var material = await _appDbContext.Materiais.FindAsync(id);

            if (material == null)
            {
                return NotFound("Material não encontrado!");
            }

            _appDbContext.Materiais.Remove(material);
            await _appDbContext.SaveChangesAsync();

            return Ok("Material mandado para a glória!");
        }
    }
}
