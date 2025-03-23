using api.Domain.Entities.Todo;
using api.Infrastructure.Services.Caching;
using api.Application.Common.CategoryDetails;
using api.Application.Common.PaginatedResult;

namespace api.Features.Todos.Repository;

public class CachedTodoRepository : ITodoRepository
{
    private readonly ITodoRepository _innerRepository;
    private readonly IRedisCacheService _cache;


    public async Task<Todo?> CreateAsync(Todo entity)
    {
        return await _innerRepository.CreateAsync(entity);
    }

    public async Task<Todo?> GetByIdAsync(Guid id)
    {
        var cacheKey = $"todo:{id}";
        var cacheDuration = TimeSpan.FromSeconds(20);
        var cachedTodo = await _cache.GetAsync<Todo>(cacheKey);

        if (cachedTodo is not null) return cachedTodo;

        var todo = await _innerRepository.GetByIdAsync(id);

        if (todo is not null)
        {
            await _cache.SetAsync(cacheKey, todo, cacheDuration);
        }

        return todo;
    }

    public async Task<PaginatedResult<Todo>> GetAllAsync(Guid? cursor, int? limit)
    {
        var cacheKey = $"todo:all";
        var cacheDuration = TimeSpan.FromMinutes(1);
        var cachedTodos = await _cache.GetAsync<PaginatedResult<Todo>>(cacheKey);

        if (cachedTodos is not null) return cachedTodos;

        var todos = await _innerRepository.GetAllAsync(cursor, limit);

        await _cache.SetAsync(cacheKey, todos, cacheDuration);

        return todos;
    }

    public Todo Update(Todo entity)
    {
        return _innerRepository.Update(entity);
    }

    public async Task<bool> DeleteAsync(Guid id)
    {
        var cacheKey = $"todo:{id}";
        bool deleted = await _innerRepository.DeleteAsync(id);

        if (deleted)
        {
            await _cache.DeleteAsync(cacheKey);
        }

        return deleted;
    }

    public async Task<CategoryDetails> GetAllTodoCategories()
    {
        return await _innerRepository.GetAllTodoCategories();
    }
}