using _ProjetoEdenz.Data;
using _ProjetoEdenz.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace _ProjetoEdenz.Controllers
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
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _appDbContext.Trilhos.Add(trilho);
            await _appDbContext.SaveChangesAsync();

            return CreatedAtAction(nameof(GetTrilho), new { id = trilho.Id }, trilho);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Trilho>>> GetTrilho()
        {
            var trilhos = await _appDbContext.Trilhos.ToListAsync();
            return Ok(trilhos);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Trilho>> GetTrilho(int id)
        {
            var trilho = await _appDbContext.Trilhos.FindAsync(id);

            if (trilho == null)
            {
                return NotFound("Trilho não encontrado!");
            }

            return Ok(trilho);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTrilho(int id, [FromBody] Trilho trilhoAtualizado)
        {
            if (id != trilhoAtualizado.Id)
            {
                return BadRequest("ID da URL e do objeto não conferem.");
            }

            var trilhoExistente = await _appDbContext.Trilhos.FindAsync(id);

            if (trilhoExistente == null)
            {
                return NotFound("Trilho não encontrado!");
            }

            _appDbContext.Entry(trilhoExistente).CurrentValues.SetValues(trilhoAtualizado);
            await _appDbContext.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteTrilho(int id)
        {
            var trilho = await _appDbContext.Trilhos.FindAsync(id);

            if (trilho == null)
            {
                return NotFound("Trilho não encontrado!");
            }

            _appDbContext.Trilhos.Remove(trilho);
            await _appDbContext.SaveChangesAsync();

            return Ok("Trilho mandado para a glória!");
        }
    }
}
