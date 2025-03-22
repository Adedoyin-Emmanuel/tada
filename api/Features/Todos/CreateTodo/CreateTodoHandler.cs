using MediatR;
using AutoMapper;
using FluentResults;
using FluentValidation;
using api.Domain.Entities.Todo;
using api.Features.Todos.Repository;
using api.Infrastructure.Repositories;

namespace api.Features.Todos.CreateTodo;

public class CreateTodoHandler : IRequestHandler<CreateTodoCommand, Result<CreateTodoCommandResponse>>
{
    private readonly IMapper _mapper;
    private readonly IUnitOfWork _unitOfWork;
    private readonly ITodoRepository _todoRepository;
    private readonly ILogger<CreateTodoHandler> _logger;
    private readonly IValidator<CreateTodoCommand> _validator;


    public CreateTodoHandler(IMapper mapper, IUnitOfWork unitOfWork, ITodoRepository todoRepository, ILogger<CreateTodoHandler> logger, IValidator<CreateTodoCommand> validator)
    {
        _mapper = mapper;
        _logger = logger;
        _validator = validator;
        _unitOfWork = unitOfWork;
        _todoRepository = todoRepository;
    }
    
    public async Task<Result<CreateTodoCommandResponse>> Handle(CreateTodoCommand request, CancellationToken cancellationToken)
    {
        Console.WriteLine(request);
        await _validator.ValidateAndThrowAsync(request, cancellationToken);

        var product = _mapper.Map<CreateTodoCommand, Todo>(request);

        var createdProduct = await _todoRepository.CreateAsync(product);

        await _unitOfWork.SaveChangesAsync();

        var createdProductResponse = _mapper.Map<Todo, CreateTodoCommandResponse>(createdProduct!);

        return Result.Ok(createdProductResponse);
    }
}
