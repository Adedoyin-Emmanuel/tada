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
            .IsInEnum()
            .WithMessage("Category must be a valid value: 0 (Health), 1 (Work), 2 (MentalHealth), or 3 (Others)")
            .NotEmpty()
            .WithMessage("Category is required. Valid values are: 0 (Health), 1 (Work), 2 (MentalHealth), or 3 (Others)");

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

        RuleFor(todo => todo.DueTime).NotEmpty().NotNull().When(todo => true)
            .WithMessage("Due time is required");
    }
} 