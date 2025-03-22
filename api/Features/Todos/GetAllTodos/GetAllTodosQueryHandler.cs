using MediatR;
using FluentResults;
using FluentValidation;
using api.Domain.Entities.Todo;
using api.Features.Todos.Repository;
using api.Application.Common.PaginatedResult;

namespace api.Features.Todos.GetAllTodos;

public class GetAllTodosQueryHandler : IRequestHandler<GetAllTodosQuery, Result<PaginatedResult<GetAllTodosQueryItem>>>
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

    public async Task<Result<PaginatedResult<GetAllTodosQueryItem>>> Handle(GetAllTodosQuery request, CancellationToken cancellationToken)
    {
        await _validator.ValidateAndThrowAsync(request, cancellationToken);

        var allTodos = await _todoRepository.GetAllAsync(request.Cursor, request.Limit);

        var todosToReturn = new PaginatedResult<GetAllTodosQueryItem>
        {
            Items = allTodos.Items.Select(todo => new GetAllTodosQueryItem
            {
                Id = todo.Id,
                Title = todo.Title,
                Category = todo.Category.ToString(), 
                IsDone = todo.IsDone,
                SubTodos = todo.SubTodos?.Select(sub => new SubTodoDto
                {
                    Title = sub.Title,
                    IsDone = sub.IsDone
                }).ToList(),
                DueTime = todo.DueTime,
                CreatedAt = todo.CreatedAt,
                UpdatedAt = todo.UpdatedAt
            }).ToList(),
            NextCursor = allTodos.NextCursor,
            Limit = allTodos.Limit
        };

        return Result.Ok(todosToReturn).WithSuccess("Todos fetched successfully");
    }

}