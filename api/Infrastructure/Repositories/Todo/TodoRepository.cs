using api.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace api.Infrastructure.Repositories.Todo;

public class TodoRepository : Repository<Domain.Entities.Todo.Todo>, ITodoRepository
{
    public TodoRepository(AppDbContext context) : base(context)
    {
    }
}