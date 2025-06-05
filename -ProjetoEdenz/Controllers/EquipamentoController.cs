using _ProjetoEdenz.Data;
using _ProjetoEdenz.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace _ProjetoEdenz.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EquipamentoController : ControllerBase
    {
        private readonly AppDbContext _appDbContext;

        public EquipamentoController(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        [HttpPost]
        public async Task<IActionResult> AddEquipamento(Equipamento equipamento)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _appDbContext.Equipamentos.Add(equipamento);
            await _appDbContext.SaveChangesAsync();

            return CreatedAtAction(nameof(GetEquipamento), new { id = equipamento.Id }, equipamento);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Equipamento>>> GetEquipamento()
        {
            var equipamentos = await _appDbContext.Equipamentos.ToListAsync();
            return Ok(equipamentos);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Equipamento>> GetEquipamento(int id)
        {
            var equipamento = await _appDbContext.Equipamentos.FindAsync(id);

            if (equipamento == null)
            {
                return NotFound("Equipamento não encontrado!");
            }

            return Ok(equipamento);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateEquipamento(int id, [FromBody] Equipamento equipamentoAtualizado)
        {
            if (id != equipamentoAtualizado.Id)
            {
                return BadRequest("ID da URL e do objeto não conferem.");
            }

            var equipamentoExistente = await _appDbContext.Equipamentos.FindAsync(id);

            if (equipamentoExistente == null)
            {
                return NotFound("Equipamento não encontrado!");
            }

            _appDbContext.Entry(equipamentoExistente).CurrentValues.SetValues(equipamentoAtualizado);
            await _appDbContext.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteEquipamento(int id)
        {
            var equipamento = await _appDbContext.Equipamentos.FindAsync(id);

            if (equipamento == null)
            {
                return NotFound("Equipamento não encontrado!");
            }

            _appDbContext.Equipamentos.Remove(equipamento);
            await _appDbContext.SaveChangesAsync();

            return Ok("Equipamento mandado para a glória!");
        }
    }
}
