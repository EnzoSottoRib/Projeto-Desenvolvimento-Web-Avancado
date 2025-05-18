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
            var equipamentoExiste = await _appDbContext.Equipamentos
                .AnyAsync(e => e.Id == manutencao.IdEquipamento);

            if (!equipamentoExiste)
                return BadRequest("Equipamento não encontrado!");

            foreach (var material in manutencao.Materiais)
            {
                var materialExiste = await _appDbContext.Materiais
                    .AnyAsync(m => m.Id == material.Id);

                if (!materialExiste)
                    return BadRequest($"Material ID {material.Id} não existe!");
            }

            _appDbContext.Manutencoes.Add(manutencao);
            await _appDbContext.SaveChangesAsync();

            return CreatedAtAction(nameof(GetManutencao), new { id = manutencao.Id }, manutencao);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Manutencao>>> GetAllManutencoes()
        {
            var manutencoes = await _appDbContext.Manutencoes
                .Include(m => m.Equipamento)
                .Include(m => m.Materiais)
                .ToListAsync();

            return Ok(manutencoes);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Manutencao>> GetManutencao(int id)
        {
            var manutencao = await _appDbContext.Manutencoes
                .Include(m => m.Equipamento)
                .Include(m => m.Materiais)
                .FirstOrDefaultAsync(m => m.Id == id);

            if (manutencao == null)
            {
                return NotFound("Manutenção não encontrada!");
            }

            return Ok(manutencao);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateManutencao(int id, [FromBody] Manutencao manutencaoAtualizada)
        {
            if (id != manutencaoAtualizada.Id)
                return BadRequest("ID da URL e do objeto não conferem.");

            var manutencaoExistente = await _appDbContext.Manutencoes.FindAsync(id);

            if (manutencaoExistente == null)
            {
                return NotFound("Manutenção não encontrada!");
            }

            _appDbContext.Entry(manutencaoExistente).CurrentValues.SetValues(manutencaoAtualizada);

            await _appDbContext.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteManutencao(int id)
        {
            var manutencao = await _appDbContext.Manutencoes.FindAsync(id);

            if (manutencao == null)
            {
                return NotFound("Manutenção não encontrada!");
            }

            _appDbContext.Manutencoes.Remove(manutencao);
            await _appDbContext.SaveChangesAsync();

            return Ok("Manutenção mandada para a glória!");
        }
    }
}
