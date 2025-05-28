using _ProjetoEdenz.Data;
using _ProjetoEdenz.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace _ProjetoEdenz.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EngenheiroController : ControllerBase
    {
        private readonly AppDbContext _appDbContext;

        public EngenheiroController(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        [HttpPost]
        public async Task<IActionResult> AddEngenheiro([FromBody] Engenheiro engenheiro)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (engenheiro.DataNascimento > DateTime.Now)
            {
                ModelState.AddModelError(nameof(engenheiro.DataNascimento), "Data de nascimento não pode ser futura");
                return BadRequest(ModelState);
            }

            try
            {
                _appDbContext.Engenheiros.Add(engenheiro);
                await _appDbContext.SaveChangesAsync();

                return CreatedAtAction(nameof(GetEngenheiro), new { id = engenheiro.Id }, engenheiro);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    title = "Erro interno no servidor",
                    details = ex.Message
                });
            }
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Engenheiro>>> GetEngenheiro()
        {
            var engenheiros = await _appDbContext.Engenheiros.ToListAsync();
            return Ok(engenheiros);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Engenheiro>> GetEngenheiro(int id)
        {
            var engenheiro = await _appDbContext.Engenheiros.FindAsync(id);

            if (engenheiro == null)
            {
                return NotFound("Engenheiro não encontrado!");
            }

            return Ok(engenheiro);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateEngenheiro(int id, [FromBody] Engenheiro engenheiroAtualizado)
        {
            if (id != engenheiroAtualizado.Id)
            {
                return BadRequest("ID da URL e do objeto não conferem.");
            }

            if (engenheiroAtualizado.DataNascimento > DateTime.Now)
            {
                return BadRequest("Data de nascimento não pode ser futura");
            }

            try
            {
                var engenheiroExistente = await _appDbContext.Engenheiros.FindAsync(id);

                if (engenheiroExistente == null)
                {
                    return NotFound("Engenheiro não encontrado!");
                }

                _appDbContext.Entry(engenheiroExistente).CurrentValues.SetValues(engenheiroAtualizado);
                await _appDbContext.SaveChangesAsync();

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    title = "Erro interno no servidor",
                    details = ex.Message
                });
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteEngenheiro(int id)
        {
            try
            {
                var engenheiro = await _appDbContext.Engenheiros.FindAsync(id);

                if (engenheiro == null)
                {
                    return NotFound("Engenheiro não encontrado!");
                }

                _appDbContext.Engenheiros.Remove(engenheiro);
                await _appDbContext.SaveChangesAsync();

                return Ok("Engenheiro mandado para a glória!");
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    title = "Erro interno no servidor",
                    details = ex.Message
                });
            }
        }
    }
}