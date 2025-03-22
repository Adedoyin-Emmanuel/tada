using MediatR;
using AutoMapper;
using FluentResults;
using FluentValidation;
using api.Domain.Entities.Todo;
using api.Features.Todos.Repository;

namespace api.Features.Todos.GetTodoById;

public class GetTodoByIdQueryHandler : IRequestHandler<GetTodoByIdQuery, Result<GetTodoByIdQueryResponse>>
{

    private readonly IMapper _mapper;
    private readonly ITodoRepository _todoRepository;
    private readonly IValidator<GetTodoByIdQuery> _validator;
    private readonly ILogger<GetTodoByIdQueryHandler> _logger;

    public GetTodoByIdQueryHandler(IMapper mapper, ITodoRepository todoRepository, IValidator<GetTodoByIdQuery> validator, ILogger<GetTodoByIdQueryHandler> logger)
    {
        _mapper = mapper;
        _todoRepository = todoRepository;
        _validator = validator;
        _logger = logger;
    }


    public async Task<Result<GetTodoByIdQueryResponse>> Handle(GetTodoByIdQuery request, CancellationToken cancellationToken)
    {
        await _validator.ValidateAndThrowAsync(request, cancellationToken);

        var existingTodo = await _todoRepository.GetByIdAsync(request.Id);

        if (existingTodo is null)
        {
            return Result.Fail("Todo with given Id not found");
        }

        var todo = _mapper.Map<Todo, GetTodoByIdQueryResponse>(existingTodo);

        return Result.Ok(todo).WithSuccess("Todo retrived successfully");
    }
}