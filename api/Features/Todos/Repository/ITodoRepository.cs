using api.Infrastructure.Repositories;

namespace api.Features.Todos.Repository;

public interface ITodoRepository : IRepository<Domain.Entities.Todo.Todo>
{
    
}