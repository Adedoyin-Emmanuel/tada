using api.Application.Common.PaginatedResult;
using api.Domain.Entities.Base;

namespace api.Infrastructure.Repositories;

public interface IRepository<T> where T : class, IBase
{
    public Task<T?> CreateAsync(T entity);
    
    public Task<T?> GetByIdAsync(Guid id);

    public Task<PaginatedResult<T>> GetAllAsync(Guid? cursor, int? limit);
    
    public T Update(T entity);
    
    public Task<bool> DeleteAsync(Guid id);
}