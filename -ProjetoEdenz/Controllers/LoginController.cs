using _ProjetoEdenz.Data;
using _ProjetoEdenz.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Xablau.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LoginController : ControllerBase
    {
        private readonly AppDbContext _appDbContext;

        public LoginController(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        [HttpPost]
        public async Task<IActionResult> Login([FromBody] LoginDTO usuarioLogin)
        {
            if (string.IsNullOrEmpty(usuarioLogin.Email) || string.IsNullOrEmpty(usuarioLogin.Senha))
                return BadRequest("Email e senha são obrigatórios.");

            var usuario = await _appDbContext.Usuarios
                .FirstOrDefaultAsync(u => u.Email == usuarioLogin.Email && u.Senha == usuarioLogin.Senha);

            if (usuario == null)
                return Unauthorized("Email ou senha inválidos.");

            // aqui você pode retornar o usuário ou token, por enquanto retorno básico
            return Ok(new
            {
                usuario.Id,
                usuario.Nome,
                usuario.Email
            });
        }

       
    }

    public class LoginDTO
    {
        public string Email { get; set; }
        public string Senha { get; set; }
    }
}