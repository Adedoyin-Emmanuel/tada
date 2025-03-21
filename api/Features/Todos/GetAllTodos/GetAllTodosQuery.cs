using api.Application.Common.PaginatedResult;
using MediatR;
using FluentResults;
using api.Domain.Entities.Todo;

namespace api.Features.Todos.GetAllTodos;

public class GetAllTodosQuery : IRequest<Result<PaginatedResult<Todo>>>
{
    public Guid? Cursor { get; set; }
    public int? Limit { get; set; } = 10;
}