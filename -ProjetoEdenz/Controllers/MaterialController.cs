using _ProjetoEdenz.Data;
using _ProjetoEdenz.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Xablau.Controllers
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
            if (!ModelState.IsValid) {
                return BadRequest(ModelState);
            }

            _appDbContext.Material.Add(material);
            await _appDbContext.SaveChangesAsync();

            return StatusCode(201, material);
        }

        [HttpGet]
        public async Task<ActionResult <IEnumerable<Material>>> GetMaterial()
        {
            var materiais = await _appDbContext.Material.ToListAsync();

            return Ok(materiais);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Material>> GetMaterial(int id)
        {
            var material = await _appDbContext.Material.FindAsync(id);

            if (material == null) {
                return NotFound("Material não encontrado!");
            }

            return Ok(material);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateMaterial(int id, [FromBody] Material materialAtualizado)
        {
            var materialExistente = await _appDbContext.Material.FindAsync(id);

            if (materialExistente == null) {
                return NotFound("Material não encontrado!");
            }

            _appDbContext.Entry(materialExistente).CurrentValues.SetValues(materialAtualizado);

            await _appDbContext.SaveChangesAsync();

            return StatusCode(201, materialAtualizado);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteMaterial(int id)
        {
            var material = await _appDbContext.Material.FindAsync(id);

            if (material == null) {
                return NotFound("Material não encontrado!");
            }

            _appDbContext.Remove(material);

            await _appDbContext.SaveChangesAsync();

            return Ok("Material mandado para a glória!");
        }
    }
}