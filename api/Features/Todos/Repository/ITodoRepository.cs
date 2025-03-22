using api.Infrastructure.Repositories;
using api.Application.Common.CategoryDetails;

namespace api.Features.Todos.Repository;

public interface ITodoRepository : IRepository<Domain.Entities.Todo.Todo>
{
    public Task<CategoryDetails> GetAllTodoCategories();
}