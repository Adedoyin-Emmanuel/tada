using FluentValidation;

namespace api.Features.Todos.DeleteTodo;

public class DeleteCommandValidator : AbstractValidator<DeleteTodoCommand>
{
    public DeleteCommandValidator()
    {
        RuleFor(todo => todo.Id).NotEmpty().NotNull();
    }
    
}