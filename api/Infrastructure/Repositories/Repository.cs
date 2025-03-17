using api.Domain.Entities.Base;
using Microsoft.EntityFrameworkCore;
using api.Infrastructure.Persistence;

namespace api.Infrastructure.Repositories;

public class Repository<T> : IRepository<T> where T : class, IBase
{
    protected readonly DbSet<T> _dbSet;
    private readonly AppDbContext _context;


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

    public async Task<List<T>> GetAllAsync()
    {
        var entityQuery = _dbSet.AsQueryable();
        
        
        /*
         * I might implement cursor / Key based pagination here
         * Just to play with it and all. 
         */
        
        return await entityQuery.ToListAsync();
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