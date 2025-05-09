using _ProjetoEdenz.Data;
using _ProjetoEdenz.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace _ProjetoEdenz.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class StatusController : ControllerBase
    {
        private readonly AppDbContext _appDbContext;

        public StatusController(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        [HttpPost]
        public async Task<IActionResult> AddStatus(Status status)
        {
            if (!ModelState.IsValid) {
                return BadRequest(ModelState);
            }

            _appDbContext.Status.Add(status);
            await _appDbContext.SaveChangesAsync();

            return StatusCode(201, status);
        }

        [HttpGet]
        public async Task<ActionResult <IEnumerable<Status>>> GetStatus()
        {
            var statuses = await _appDbContext.Status.ToListAsync();

            return Ok(statuses);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Status>> GetStatus(int id)
        {
            var status = await _appDbContext.Status.FindAsync(id);

            if (status == null) {
                return NotFound("Status não encontrado!");
            }

            return Ok(status);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateStatus(int id, [FromBody] Status statusAtualizado)
        {
            var statusExistente = await _appDbContext.Status.FindAsync(id);

            if (statusExistente == null) {
                return NotFound("Status não encontrado!");
            }

            _appDbContext.Entry(statusExistente).CurrentValues.SetValues(statusAtualizado);

            await _appDbContext.SaveChangesAsync();

            return StatusCode(201, statusAtualizado);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteStatus(int id)
        {
            var status = await _appDbContext.Status.FindAsync(id);

            if (status == null) {
                return NotFound("Status não encontrado!");
            }

            _appDbContext.Remove(status);

            await _appDbContext.SaveChangesAsync();

            return Ok("Status mandado para a glória!");
        }
    }
}