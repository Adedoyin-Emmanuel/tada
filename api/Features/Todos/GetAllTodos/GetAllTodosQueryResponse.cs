using api.Domain.Entities.Todo;
using api.Application.Common.PaginatedResult;

namespace api.Features.Todos.GetAllTodos;

public class GetAllTodosQueryResponse
{
    public PaginatedResult<Todo> Items;
    public Guid? NextCursor;
    public int? Limit;
}