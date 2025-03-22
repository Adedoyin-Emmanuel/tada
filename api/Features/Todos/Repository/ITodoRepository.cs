using api.Application.Common.CategoryDetails;
using api.Infrastructure.Repositories;

namespace api.Features.Todos.Repository;

public interface ITodoRepository : IRepository<Domain.Entities.Todo.Todo>
{
    public Task<CategoryDetails> GetAllTodoCategories();
}