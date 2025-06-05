using _ProjetoEdenz.Data;
using _ProjetoEdenz.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace _ProjetoEdenz.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TipoManutencaoController : ControllerBase
    {
        private readonly AppDbContext _appDbContext;

        public TipoManutencaoController(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        [HttpPost]
        public async Task<IActionResult> AddTipoManutencao(TipoManutencao tipoManutencao)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _appDbContext.TiposManutencao.Add(tipoManutencao);
            await _appDbContext.SaveChangesAsync();

            return CreatedAtAction(nameof(GetTipoManutencao), new { id = tipoManutencao.Id }, tipoManutencao);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<TipoManutencao>>> GetTipoManutencao()
        {
            var tiposManutencao = await _appDbContext.TiposManutencao.ToListAsync();
            return Ok(tiposManutencao);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<TipoManutencao>> GetTipoManutencao(int id)
        {
            var tipoManutencao = await _appDbContext.TiposManutencao.FindAsync(id);

            if (tipoManutencao == null)
            {
                return NotFound("Tipo de manutenção não encontrado!");
            }

            return Ok(tipoManutencao);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTipoManutencao(int id, [FromBody] TipoManutencao tipoManutencaoAtualizado)
        {
            if (id != tipoManutencaoAtualizado.Id)
            {
                return BadRequest("ID da URL e do objeto não conferem.");
            }

            var tipoManutencaoExistente = await _appDbContext.TiposManutencao.FindAsync(id);

            if (tipoManutencaoExistente == null)
            {
                return NotFound("Tipo de manutenção não encontrado!");
            }

            _appDbContext.Entry(tipoManutencaoExistente).CurrentValues.SetValues(tipoManutencaoAtualizado);
            await _appDbContext.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteTipoManutencao(int id)
        {
            var tipoManutencao = await _appDbContext.TiposManutencao.FindAsync(id);

            if (tipoManutencao == null)
            {
                return NotFound("Tipo de manutenção não encontrado!");
            }

            _appDbContext.TiposManutencao.Remove(tipoManutencao);
            await _appDbContext.SaveChangesAsync();

            return Ok("Tipo de manutenção mandado para a glória!");
        }
    }
}
