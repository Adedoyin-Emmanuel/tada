using api.Domain.Entities.Base;
using Microsoft.EntityFrameworkCore;
using api.Infrastructure.Persistence;
using api.Application.Common.PaginatedResult;

namespace api.Infrastructure.Repositories;

public class Repository<T> : IRepository<T> where T : class, IBase
{
    protected readonly DbSet<T> _dbSet;
    protected readonly AppDbContext _context;


    public Repository(AppDbContext context)
    {
        _context = context;
        _dbSet = _context.Set<T>();
    }
    
    
    public async Task<T?> CreateAsync(T entity)
    {
        var createdEntity = await _dbSet.AddAsync(entity);
        return createdEntity.Entity;
    }

    public async Task<T?> GetByIdAsync(Guid id)
    {
        return await _dbSet.FindAsync(id);
    }

    public async Task<PaginatedResult<T>> GetAllAsync(Guid? cursor, int? limit)
    {
        var queryableEntity = _dbSet.AsQueryable();

        var query = queryableEntity.OrderBy(entity => entity.Id);

        int totalItems = await queryableEntity.CountAsync();

        if (cursor.HasValue && cursor.Value != Guid.Empty)
        {
            query = (IOrderedQueryable<T>)query.Where(entity => entity.Id > cursor.Value);
        }

        var items = limit.HasValue 
            ? await query.Take(limit.Value).ToListAsync()
            : await query.ToListAsync();

        Guid? nextCursor = items.Any() ? items.Last().Id : null;

        return new PaginatedResult<T>
        {
            Items = items,
            NextCursor = nextCursor,
            Limit = limit,
            Total = totalItems
        };
    }



    public T Update(T entity)
    {
        var updatedEntity = _dbSet.Update(entity);
        
        return updatedEntity.Entity;
    }

    public async Task<bool> DeleteAsync(Guid id)
    {
        var existingEntity = await _dbSet.FindAsync(id);
        
        if (existingEntity == null) return false;
        
        _dbSet.Remove(existingEntity);

        return true;
    }
}