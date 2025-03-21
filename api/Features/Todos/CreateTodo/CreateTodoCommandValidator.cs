using FluentValidation;
using api.Domain.Constants.Category;

namespace api.Features.Todos.CreateTodo;

public class CreateTodoCommandValidator : AbstractValidator<CreateTodoCommand>
{
    public CreateTodoCommandValidator()
    {
        RuleFor(todo => todo.Title)
            .NotEmpty()
            .WithMessage("Title is required")
            .MaximumLength(100)
            .WithMessage("Title must not exceed 100 characters");

        RuleFor(todo => todo.Category)
            .Must(category => Enum.IsDefined(typeof(Category), category))
            .WithMessage(todo => $"Category value {(int)todo.Category} is not valid. Valid values are: 0 (Health), 1 (Work), 2 (MentalHealth), or 3 (Others)");

        RuleFor(todo => todo.SubTodos)
            .ForEach(subTodos =>
            {
                subTodos.ChildRules(subTodo =>
                {
                    subTodo.RuleFor(s => s.Title)
                        .NotEmpty()
                        .WithMessage("Each subtask must have a title")
                        .MaximumLength(100)
                        .WithMessage("Subtask title must not exceed 100 characters");
                });
            })
            .When(todo => todo.SubTodos != null && todo.SubTodos.Any());
    }
} 