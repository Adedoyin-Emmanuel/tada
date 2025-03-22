using MediatR;
using FluentResults;

namespace api.Features.Todos.GetTodoById;

public record GetTodoByIdQuery : IRequest<Result<GetTodoByIdQueryResponse>>
{
    public Guid Id { get; set; }
}