using api.Infrastructure.Persistence;
using api.Infrastructure.Repositories;

namespace api.Features.Todos.Repository;

public class TodoRepository : Repository<Domain.Entities.Todo.Todo>, ITodoRepository
{
    
    public TodoRepository(AppDbContext context) : base(context)
    {
    }
}