using _ProjetoEdenz.Data;
using _ProjetoEdenz.Models;
using BCrypt.Net;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace _ProjetoEdenz.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsuarioController : ControllerBase
    {
        private readonly AppDbContext _appDbContext;

        public UsuarioController(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

    [HttpPost]
    public async Task<IActionResult> PostUsuario([FromBody] Usuario usuario)
    {
    if (string.IsNullOrWhiteSpace(usuario.Senha))
    {
        return BadRequest("A senha não pode estar vazia.");
    }

    var existente = await _appDbContext.Usuarios.FirstOrDefaultAsync(u => u.Email == usuario.Email);
    if (existente != null)
    {
        return BadRequest("Este e-mail já está em uso.");
    }

    
    usuario.Senha = BCrypt.Net.BCrypt.HashPassword(usuario.Senha);

    _appDbContext.Usuarios.Add(usuario);
    await _appDbContext.SaveChangesAsync();

    return Ok("Usuário cadastrado com sucesso.");
}


        [HttpGet]
        public async Task<ActionResult<IEnumerable<Usuario>>> GetUsuario()
        {
            var usuarios = await _appDbContext.Usuarios.ToListAsync();
            return Ok(usuarios);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Usuario>> GetUsuario(int id)
        {
            var usuario = await _appDbContext.Usuarios.FindAsync(id);

            if (usuario == null) {
                return NotFound("Usuario não encontrado!");
            }

            return Ok(usuario);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUsuario(int id, [FromBody] Usuario usuarioAtualizado)
        {
            var usuarioExistente = await _appDbContext.Usuarios.FindAsync(id);

            if (usuarioExistente == null) {
                return NotFound("Usuario não encontrado!");
            }

            _appDbContext.Entry(usuarioExistente).CurrentValues.SetValues(usuarioAtualizado);

            await _appDbContext.SaveChangesAsync();

            return StatusCode(201, usuarioAtualizado);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteUsuario(int id)
        {
            var usuario = await _appDbContext.Usuarios.FindAsync(id);

            if (usuario == null) {
                return NotFound("Usuario não encontrado!");
            }

            _appDbContext.Remove(usuario);
            await _appDbContext.SaveChangesAsync();

            return Ok("Usuario mandado para a glória!");
        }
    }
}
