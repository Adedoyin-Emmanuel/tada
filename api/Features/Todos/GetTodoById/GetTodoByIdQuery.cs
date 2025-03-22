using MediatR;
using FluentResults;
using api.Domain.Entities.Todo;

namespace api.Features.Todos.GetTodoById;

public record GetTodoByIdQuery : IRequest<Result<GetTodoByIdQueryResponse>>
{
    public Guid Id { get; set; }
}