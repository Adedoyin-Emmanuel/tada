namespace api.Infrastructure.Repositories;

public interface IUnitOfWork : IDisposable
{
    Task<int> SaveChangesAsync();
}