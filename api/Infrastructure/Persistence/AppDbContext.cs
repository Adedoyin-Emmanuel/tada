using System.Reflection;
using api.Domain.Entities.Todo;
using Microsoft.EntityFrameworkCore;

namespace api.Infrastructure.Persistence;

public class AppDbContext :DbContext
{

    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }
    
    public DbSet<Todo> Todos { get; set; }


    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
        base.OnModelCreating(modelBuilder);
    }
}