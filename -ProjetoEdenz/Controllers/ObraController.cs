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
            var usuarioExiste = await _appDbContext.Usuarios.AnyAsync(u => u.UsuarioId == obra.UsuarioId);
            var engenheiroExiste = await _appDbContext.Engenheiros.AnyAsync(e => e.EngenheiroId == obra.EngenheiroId);
            var statusExiste = await _appDbContext.Status.AnyAsync(s => s.StatusId == obra.StatusId);

            if (!usuarioExiste)
                return BadRequest("Usuário não encontrado!");
            if (!engenheiroExiste)
                return BadRequest("Engenheiro não encontrado!");
            if (!statusExiste)
                return BadRequest("Status não encontrado!");

            _appDbContext.Obra.Add(obra);
            await _appDbContext.SaveChangesAsync();

            return CreatedAtAction(nameof(GetObraById), new { id = obra.ObraId }, obra);
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
            var obra = await _appDbContext.Obra
                .Include(o => o.Usuario)
                .Include(o => o.Engenheiro)
                .Include(o => o.Status)
                .FirstOrDefaultAsync(o => o.ObraId == id);

            if (obra == null)
            {
                return NotFound("Obra não encontrada!");
            }

            return Ok(obra);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateObra(int id, [FromBody] Obra obraAtualizada)
        {
            var obraExistente = await _appDbContext.Obra
                .FirstOrDefaultAsync(o => o.ObraId == id);

            if (obraExistente == null)
            {
                return NotFound("Obra não encontrada!");
            }

            if (obraAtualizada.UsuarioId != obraExistente.UsuarioId)
            {
                var usuarioExiste = await _appDbContext.Usuarios.AnyAsync(u => u.UsuarioId == obraAtualizada.UsuarioId);
                if (!usuarioExiste)
                    return BadRequest("Novo usuário não encontrado!");
            }

            _appDbContext.Entry(obraExistente).CurrentValues.SetValues(obraAtualizada);
            await _appDbContext.SaveChangesAsync();

            return Ok(obraExistente);
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