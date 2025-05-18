using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using _ProjetoEdenz.Models;
using Microsoft.EntityFrameworkCore;

namespace _ProjetoEdenz.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<Usuario> Usuarios { get; set; }
    public DbSet<Engenheiro> Engenheiros { get; set; }
    public DbSet<Obra> Obras { get; set; }
    public DbSet<Status> Status { get; set; }
    public DbSet<Manutencao> Manutencoes { get; set; }
    public DbSet<Material> Materiais { get; set; }
    public DbSet<Equipamento> Equipamentos { get; set; }
    public DbSet<Trilho> Trilhos { get; set; }
    public DbSet<TipoManutencao> TiposManutencao { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.Seed();
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(AppDbContext).Assembly);
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        base.OnConfiguring(optionsBuilder);
    }
}