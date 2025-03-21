using MediatR;
using FluentResults;
using FluentValidation;
using api.Domain.Entities.Todo;
using api.Features.Todos.Repository;
using api.Application.Common.PaginatedResult;

namespace api.Features.Todos.GetAllTodos;

public class GetAllTodosQueryHandler : IRequestHandler<GetAllTodosQuery, Result<PaginatedResult<Todo>>>
{
    private readonly ITodoRepository _todoRepository;
    private readonly ILogger<GetAllTodosQueryHandler> _logger;
    private readonly IValidator<GetAllTodosQuery> _validator;


    public GetAllTodosQueryHandler(ITodoRepository todoRepository, ILogger<GetAllTodosQueryHandler> logger, IValidator<GetAllTodosQuery> validator)
    {
        _logger = logger;
        _validator = validator;
        _todoRepository = todoRepository;
    }

    public async Task<Result<PaginatedResult<Todo>>> Handle(GetAllTodosQuery request, CancellationToken cancellationToken)
    {
        await _validator.ValidateAndThrowAsync(request, cancellationToken);

        var allTodos = await _todoRepository.GetAllAsync(request.Cursor, request.Limit);

        return Result.Ok(allTodos).WithSuccess("Todos fetched successfully");
    }
}