using _ProjetoEdenz.Data;
using _ProjetoEdenz.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
namespace _ProjetoEdenz.Controllers

{
    [ApiController]
    [Route("api/[controller]")]
    public class ManutencaoController : ControllerBase
    {
        private readonly AppDbContext _appDbContext;

        public ManutencaoController(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        [HttpPost]
        public async Task<IActionResult> AddManutencao(Manutencao manutencao)
        {
            if (manutencao == null) {
                return BadRequest("Dados inválidos!");
            }

            _appDbContext.Manutencao.Add(manutencao);
            await _appDbContext.SaveChangesAsync();

            return StatusCode(201, manutencao);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Manutencao>>> GetManutencao()
        {
            var manutencao = await _appDbContext.Manutencao
                .Include(o => o.Equipamento)
                .Include(o => o.Material)
                .ToListAsync();

            return Ok(manutencao);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Manutencao>> GetManutencao(int id)
        {
            var manutencao = await _appDbContext.Manutencao.FindAsync(id);

            if (manutencao == null) {
                return NotFound("Manutenção não encontrada!");
            }

            return Ok(manutencao);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateManutencao(int id, [FromBody] Manutencao manutencaoAtualizada)
        {
            var manutencaoExistente = await _appDbContext.Manutencao.FindAsync(id);

            if (manutencaoExistente == null) {
                return NotFound("Manutenção não encontrada!");
            }

            _appDbContext.Entry(manutencaoExistente).CurrentValues.SetValues(manutencaoAtualizada);

            await _appDbContext.SaveChangesAsync();

            return StatusCode(201, manutencaoAtualizada);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteManutencao(int id)
        {
            var manutencao = await _appDbContext.Manutencao.FindAsync(id);

            if (manutencao == null) {
                return NotFound("Manutenção não encontrada!");
            }

            _appDbContext.Remove(manutencao);

            await _appDbContext.SaveChangesAsync();

            return Ok("Manutenção mandada para a glória!");
        }
    }
}