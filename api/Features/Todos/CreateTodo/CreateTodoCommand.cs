using MediatR;
using FluentResults;
using api.Domain.Entities.SubTodo;
using api.Domain.Constants.Category;

namespace api.Features.Todos.CreateTodo;

public sealed record CreateTodoCommand : IRequest<Result<CreateTodoCommandResponse>>
{
    public string Title { get; set; }
    public Category Category { get; set; } = Category.Others;
    
    public ICollection<SubTodo>? SubTodos { get; set; }
    public TimeOnly DueTime { get; set; }

}