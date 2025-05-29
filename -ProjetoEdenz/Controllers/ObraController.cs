using _ProjetoEdenz.Data;
using _ProjetoEdenz.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

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
            var usuarioExiste = await _appDbContext.Usuarios.AnyAsync(u => u.Id == obra.IdUsuario);
            var engenheiroExiste = await _appDbContext.Engenheiros.AnyAsync(e => e.Id == obra.IdEngenheiro);
            var statusExiste = await _appDbContext.Status.AnyAsync(s => s.Id == obra.IdStatus);

            if (!usuarioExiste)
                return BadRequest("Usuário não encontrado!");
            if (!engenheiroExiste)
                return BadRequest("Engenheiro não encontrado!");
            if (!statusExiste)
                return BadRequest("Status não encontrado!");

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            _appDbContext.Obras.Add(obra);
            await _appDbContext.SaveChangesAsync();

            return CreatedAtAction(nameof(GetObra), new { id = obra.Id }, obra);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Obra>>> GetObras()
        {
            var obras = await _appDbContext.Obras
                .Include(o => o.Usuario)
                .Include(o => o.Engenheiro)
                .Include(o => o.Status)
                .Include(o => o.Trilho)
                .ToListAsync();

            return Ok(obras);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Obra>> GetObra(int id)
        {
            var obra = await _appDbContext.Obras
                .Include(o => o.Usuario)
                .Include(o => o.Engenheiro)
                .Include(o => o.Status)
                .Include(o => o.Trilho)
                .FirstOrDefaultAsync(o => o.Id == id);

            if (obra == null)
                return NotFound("Obra não encontrada!");

            return Ok(obra);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateObra(int id, [FromBody] Obra obraAtualizada)
        {
            if (id != obraAtualizada.Id)
                return BadRequest("ID da URL e do objeto não conferem.");

            var obraExistente = await _appDbContext.Obras.FindAsync(id);

            if (obraExistente == null)
                return NotFound("Obra não encontrada!");

            if (obraAtualizada.IdUsuario != obraExistente.IdUsuario)
            {
                var usuarioExiste = await _appDbContext.Usuarios.AnyAsync(u => u.Id == obraAtualizada.IdUsuario);
                if (!usuarioExiste)
                    return BadRequest("Novo usuário não encontrado!");
            }

            if (obraAtualizada.IdEngenheiro != obraExistente.Id)
            {
                var engenheiroExiste = await _appDbContext.Engenheiros.AnyAsync(e => e.Id == obraAtualizada.IdEngenheiro);
                if (!engenheiroExiste)
                    return BadRequest("Novo engenheiro não encontrado!");
            }

            if (obraAtualizada.IdStatus != obraExistente.IdStatus)
            {
                var statusExiste = await _appDbContext.Status.AnyAsync(s => s.Id == obraAtualizada.IdStatus);
                if (!statusExiste)
                    return BadRequest("Novo status não encontrado!");
            }

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            _appDbContext.Entry(obraExistente).CurrentValues.SetValues(obraAtualizada);
            await _appDbContext.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteObra(int id)
        {
            var obra = await _appDbContext.Obras.FindAsync(id);

            if (obra == null)
                return NotFound("Obra não encontrada!");

            _appDbContext.Obras.Remove(obra);
            await _appDbContext.SaveChangesAsync();

            return Ok("Obra mandada para a glória!");
        }
    }
}