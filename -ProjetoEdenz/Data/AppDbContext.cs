using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Xablau.Models;

namespace _ProjetoEdenz.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions options) : base(options) { }

        public DbSet<Obra> Obra { get; set; }
        public DbSet<Engenheiro> Engenheiro { get; set; }
        public DbSet<Material> Material { get; set; }
        public DbSet<Equipamento> Equipamento { get; set; }
        public DbSet<Manutencao> Manutencao { get; set; }
        public DbSet<Status> Status { get; set; }
        public DbSet<TipoManutencao> TipoManutencao { get; set; }
        public DbSet<Usuario> Usuario { get; set; }
        public DbSet<Trilho> Trilho { get; set; }
    }
}