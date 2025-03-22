using MediatR;
using FluentResults;
using FluentValidation;
using api.Features.Todos.Repository;

namespace api.Features.Todos.GetTodosHighlight;

public class GetTodosHighlightQueryHandler : IRequestHandler<GetTodosHighlightQuery, Result<GetTodosHighlightQueryResponse>>
{

    private readonly ITodoRepository _todoRepository;
    private readonly ILogger<GetTodosHighlightQuery> _logger;
    private readonly IValidator<GetTodosHighlightQuery> _validator;


    public GetTodosHighlightQueryHandler(ITodoRepository todoRepository, ILogger<GetTodosHighlightQuery> logger, IValidator<GetTodosHighlightQuery> validator)
    {
        _logger = logger;
        _validator = validator;
        _todoRepository = todoRepository;
    }

    public async Task<Result<GetTodosHighlightQueryResponse>> Handle(GetTodosHighlightQuery request, CancellationToken cancellationToken)
    {
        await _validator.ValidateAndThrowAsync(request, cancellationToken);

        var todosCategories = await _todoRepository.GetAllTodoCategories();

        return Result.Ok(
            new GetTodosHighlightQueryResponse
            {
                HealthCategoryTotal = todosCategories.HealthCategoryTotal,
                WorkCategoryTotal = todosCategories.WorkCategoryTotal,
                MentalHealthCategoryTotal = todosCategories.MentalHealthCategoryTotal,
                OthersCategoryTotal = todosCategories.OthersCategoryTotal
            }).WithSuccess("Todos highlight retrieved successfully");

    }
}