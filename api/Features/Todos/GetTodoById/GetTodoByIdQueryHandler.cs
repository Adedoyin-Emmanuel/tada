using MediatR;
using FluentResults;
using FluentValidation;
using api.Domain.Entities.Todo;
using api.Features.Todos.Repository;

namespace api.Features.Todos.GetTodoById;

public class GetTodoByIdQueryHandler : IRequestHandler<GetTodoByIdQuery, Result<Todo>>
{

    private readonly ITodoRepository _todoRepository;
    private readonly IValidator<GetTodoByIdQuery> _validator;
    private readonly ILogger<GetTodoByIdQueryHandler> _logger;

    public GetTodoByIdQueryHandler(ITodoRepository todoRepository, IValidator<GetTodoByIdQuery> validator, ILogger<GetTodoByIdQueryHandler> logger)
    {
        _logger = logger;
        _validator = validator;
        _todoRepository = todoRepository;
    }
    
    
    public async Task<Result<Todo>> Handle(GetTodoByIdQuery request, CancellationToken cancellationToken)
    {
        await _validator.ValidateAndThrowAsync(request, cancellationToken);

        var todo = await _todoRepository.GetByIdAsync(request.Id);

        if (todo is null)
        {
            return Result.Fail("Todo with given Id not found");
        }

        return Result.Ok(todo).WithSuccess("Todo retrived successfully");
    }
}