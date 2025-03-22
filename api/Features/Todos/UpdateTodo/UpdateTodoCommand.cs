using MediatR;
using FluentResults;
using api.Domain.Entities.SubTodo;
using api.Domain.Constants.Category;

namespace api.Features.Todos.UpdateTodo;

public sealed record UpdateTodoCommand : IRequest<Result<UpdateTodoCommandResponse>>
{
    public Guid Id { get; set; }
    public string? Title { get; set; }
    public Category? Category { get; set; }
    public ICollection<SubTodo> SubTodos { get; set; }
    public TimeOnly? DueTime { get; set; }
}