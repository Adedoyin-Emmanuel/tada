using api.Application.Common.CategoryDetails;
using api.Application.Common.PaginatedResult;
using api.Domain.Entities.Todo;
using api.Infrastructure.Services.Caching;

namespace api.Features.Todos.Repository;

public class CachedTodoRepository : ITodoRepository
{
    private readonly ITodoRepository _innerRepository;
    private readonly IRedisCacheService _cache;
    private readonly TimeSpan _cacheDuration = TimeSpan.FromMinutes(10);


    public async Task<Todo?> CreateAsync(Todo entity)
    {
        return await _innerRepository.CreateAsync(entity);
    }

    public async Task<Todo?> GetByIdAsync(Guid id)
    {
        return await _innerRepository.GetByIdAsync(id);
    }

    public async Task<PaginatedResult<Todo>> GetAllAsync(Guid? cursor, int? limit)
    {
        return await _innerRepository.GetAllAsync(cursor, limit);
    }

    public Todo Update(Todo entity)
    {
        return _innerRepository.Update(entity);
    }

    public async Task<bool> DeleteAsync(Guid id)
    {
        return await _innerRepository.DeleteAsync(id);
    }

    public async Task<CategoryDetails> GetAllTodoCategories()
    {
        return await _innerRepository.GetAllTodoCategories();
    }
}