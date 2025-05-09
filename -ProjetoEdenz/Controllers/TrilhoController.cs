using _ProjetoEdenz.Data;
using _ProjetoEdenz.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Xablau.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TrilhoController : ControllerBase
    {
        private readonly AppDbContext _appDbContext;

        public TrilhoController(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        [HttpPost]
        public async Task<IActionResult> AddTrilho(Trilho trilho)
        {
            if (!ModelState.IsValid) {
                return BadRequest(ModelState);
            }

            _appDbContext.Trilho.Add(trilho);
            await _appDbContext.SaveChangesAsync();

            return StatusCode(201, trilho);
        }

        [HttpGet]
        public async Task<ActionResult <IEnumerable<Trilho>>> GetTrilho()
        {
            var trilhos = await _appDbContext.Trilho.ToListAsync();

            return Ok(trilhos);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Trilho>> GetTrilho(int id)
        {
            var trilho = await _appDbContext.Trilho.FindAsync(id);

            if (trilho == null) {
                return NotFound("Trilho não encontrado!");
            }

            return Ok(trilho);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTrilho(int id, [FromBody] Trilho trilhoAtualizado)
        {
            var trilhoExistente = await _appDbContext.Trilho.FindAsync(id);

            if (trilhoExistente == null) {
                return NotFound("Trilho não encontrado!");
            }

            _appDbContext.Entry(trilhoExistente).CurrentValues.SetValues(trilhoAtualizado);

            await _appDbContext.SaveChangesAsync();

            return StatusCode(201, trilhoAtualizado);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteTrilho(int id)
        {
            var trilho = await _appDbContext.Trilho.FindAsync(id);

            if (trilho == null) {
                return NotFound("Trilho não encontrado!");
            }

            _appDbContext.Remove(trilho);

            await _appDbContext.SaveChangesAsync();

            return Ok("Trilho mandado para a glória!");
        }
    }
}