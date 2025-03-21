using api.Domain.Entities.Todo;
using api.Infrastructure.Persistence;
using api.Infrastructure.Repositories;
using api.Application.Common.PaginatedResult;
using Microsoft.EntityFrameworkCore;

namespace api.Features.Todos.Repository;

public class TodoRepository : Repository<Domain.Entities.Todo.Todo>, ITodoRepository
{
    
    public TodoRepository(AppDbContext context) : base(context)
    {
    }
}