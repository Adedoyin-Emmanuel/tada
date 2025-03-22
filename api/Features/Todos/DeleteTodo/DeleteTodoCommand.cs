using MediatR;
using FluentResults;

namespace api.Features.Todos.DeleteTodo;

public sealed record DeleteTodoCommand : IRequest<Result>
{
    public Guid Id { get; set; }
}