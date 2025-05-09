using _ProjetoEdenz.Data;
using _ProjetoEdenz.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Xablau.Controllers
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
           if (!ModelState.IsValid) {
                return BadRequest(ModelState);
            }

            _appDbContext.TipoManutencao.Add(tipoManutencao);
            await _appDbContext.SaveChangesAsync();

            return StatusCode(201, tipoManutencao);
        }

        [HttpGet]
        public async Task<ActionResult <IEnumerable<TipoManutencao>>> GetTipoManutencao()
        {
            var tiposManutencao = await _appDbContext.TipoManutencao.ToListAsync();

            return Ok(tiposManutencao);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<TipoManutencao>> GetTipoManutencao(int id)
        {
            var tipoManutencao = await _appDbContext.TipoManutencao.FindAsync(id);

            if (tipoManutencao == null) {
                return NotFound("Tipo de manutenção não encontrado!");
            }

            return Ok(tipoManutencao);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTipoManutencao(int id, [FromBody] TipoManutencao tipoManutencaoAtualizado)
        {
            var tipoManutencaoExistente = await _appDbContext.TipoManutencao.FindAsync(id);

            if (tipoManutencaoExistente == null) {
                return NotFound("Tipo de manutenção não encontrado!");
            }

            _appDbContext.Entry(tipoManutencaoExistente).CurrentValues.SetValues(tipoManutencaoAtualizado);

            await _appDbContext.SaveChangesAsync();

            return StatusCode(201, tipoManutencaoAtualizado);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteTipoManutencao(int id)
        {
            var tipoManutencao = await _appDbContext.TipoManutencao.FindAsync(id);

            if (tipoManutencao == null) {
                return NotFound("Tipo de manutenção não encontrado!");
            }

            _appDbContext.Remove(tipoManutencao);

            await _appDbContext.SaveChangesAsync();

            return Ok("Tipo de manutenção mandado para a glória!");
        }
    }
}