using MediatR;
using FluentResults;
using api.Domain.Entities.Todo;

namespace api.Features.Todos.GetAllTodos;

public class GetAllTodosQuery : IRequest<Result<Todo>>
{
    public Guid Cursor { get; set; }
    public int Limit { get; set; }
}