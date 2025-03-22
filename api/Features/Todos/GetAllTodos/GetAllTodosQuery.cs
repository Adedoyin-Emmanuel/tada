using MediatR;
using FluentResults;
using api.Application.Common.PaginatedResult;

namespace api.Features.Todos.GetAllTodos;

public class GetAllTodosQuery : IRequest<Result<PaginatedResult<GetAllTodosQueryItem>>>
{
    public Guid? Cursor { get; set; }
    public int? Limit { get; set; } = 10;
}