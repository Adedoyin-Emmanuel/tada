using FluentValidation;

namespace api.Features.Todos.GetTodoById;

public class GetTodoByIdQueryValidator : AbstractValidator<GetTodoByIdQuery>
{
    public GetTodoByIdQueryValidator()
    {
        RuleFor(todo => todo.Id).NotEmpty().NotNull();
    }
}