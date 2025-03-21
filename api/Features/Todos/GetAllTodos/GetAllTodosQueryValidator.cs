using FluentValidation;

namespace api.Features.Todos.GetAllTodos;

public class GetAllTodosQueryValidator : AbstractValidator<GetAllTodosQuery>
{
    public GetAllTodosQueryValidator()
    {
        RuleFor(todo => todo.Cursor).NotEmpty().When(todo => todo.Cursor.HasValue);
        RuleFor(todo => todo.Limit).GreaterThan(0).LessThanOrEqualTo(100).When(todo => todo.Limit.HasValue);
    }
}