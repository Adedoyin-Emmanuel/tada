using api.Domain.Entities.Base;

namespace api.Infrastructure.Repositories;

public interface IRepository<T> where T : class, IBase
{
    public Task<T?> CreateAsync(T entity);
    
    public Task<T?> GetByIdAsync(Guid id);
    
    public Task<List<T>> GetAllAsync();
    
    public Task<T> UpdateAsync(T entity);
    
    public Task<bool> DeleteAsync(Guid id);
}