using FluentValidation;
using api.Domain.Constants.Category;

namespace api.Features.Todos.UpdateTodo;

public class UpdateTodoCommandValidator : AbstractValidator<UpdateTodoCommand>
{
    public UpdateTodoCommandValidator()
    {
        RuleFor(todo => todo.Title).NotEmpty().NotNull().When(todo => todo.Title != null);
        RuleFor(todo => todo.Category)
            .Must(category => Enum.IsDefined(typeof(Category), category))
            .WithMessage(todo =>
                $"Category value {(int)todo.Category} is not valid. Valid values are: 0 (Health), 1 (Work), 2 (MentalHealth), or 3 (Others)")
            .When(todo => todo.Category.HasValue);

        RuleFor(todo => todo.SubTodos)
            .NotEmpty()
            .NotNull()
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
            });

        RuleFor(todo => todo.DueTime)
            .Must(dueTime => dueTime > TimeOnly.FromDateTime(DateTime.UtcNow))
            .WithMessage("DueTime must be in the future.").When(todo => todo.DueTime.HasValue);


    }
}