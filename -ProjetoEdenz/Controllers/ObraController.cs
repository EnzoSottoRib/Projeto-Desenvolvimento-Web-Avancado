using _ProjetoEdenz.Data;
using _ProjetoEdenz.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
namespace _ProjetoEdenz.Controllers

{
    [ApiController]
    [Route("api/[controller]")]
    public class ObraController : ControllerBase
    {
        private readonly AppDbContext _appDbContext;

        public ObraController(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        [HttpPost]
        public async Task<IActionResult> AddObra(Obra obra)
        {
            if (obra == null) {
                return BadRequest("Dados inválidos!");
            }

            _appDbContext.Obra.Add(obra);
            await _appDbContext.SaveChangesAsync();

            return StatusCode(201, obra);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Obra>>> GetObras()
        {
            var obras = await _appDbContext.Obra
                .Include(o => o.Usuario)
                .Include(o => o.Engenheiro)
                .Include(o => o.Status)
                .ToListAsync();

            return Ok(obras);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Obra>> GetObra(int id)
        {
            var obra = await _appDbContext.Obra.FindAsync(id);

            if (obra == null) {
                return NotFound("Obra não encontrada!");
            }

            return Ok(obra);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateObra(int id, [FromBody] Obra obraAtualizado)
        {
            var obraExistente = await _appDbContext.Obra.FindAsync(id);

            if (obraExistente == null) {
                return NotFound("Obra não encontrada!");
            }

            _appDbContext.Entry(obraExistente).CurrentValues.SetValues(obraAtualizado);

            await _appDbContext.SaveChangesAsync();

            return StatusCode(201, obraAtualizado);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteObra(int id)
        {
            var obra = await _appDbContext.Obra.FindAsync(id);

            if (obra == null) {
                return NotFound("Obra não encontrada!");
            }

            _appDbContext.Remove(obra);

            await _appDbContext.SaveChangesAsync();

            return Ok("Obra mandada para a glória!");
        }
    }
}