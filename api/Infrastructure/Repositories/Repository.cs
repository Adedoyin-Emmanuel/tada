using api.Domain.Entities.Base;
using api.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace api.Infrastructure.Repositories;

public class Repository<T> : IRepository<T> where T : class, IBase
{
    protected readonly DbSet<T> _dbSet;
    private readonly AppDbContext _context;


    public Repository(DbSet<T> dbSet, AppDbContext context)
    {
        _dbSet = dbSet;
        _context = context;
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

    public async Task<T> UpdateAsync(T entity)
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