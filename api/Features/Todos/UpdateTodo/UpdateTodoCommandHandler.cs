using MediatR;
using AutoMapper;
using FluentResults;
using FluentValidation;
using api.Features.Todos.Repository;
using api.Infrastructure.Repositories;

namespace api.Features.Todos.UpdateTodo;

public class UpdateTodoCommandHandler : IRequestHandler<UpdateTodoCommand, Result<UpdateTodoCommandResponse>>
{
    private readonly IMapper _mapper;
    private readonly IUnitOfWork _unitOfWork;
    private readonly ITodoRepository _todoRepository;
    private readonly IValidator<UpdateTodoCommand> _validator;
    private readonly ILogger<UpdateTodoCommandHandler> _logger;


    public UpdateTodoCommandHandler(IMapper mapper, IUnitOfWork unitOfWork, ITodoRepository todoRepository, IValidator<UpdateTodoCommand> validator, ILogger<UpdateTodoCommandHandler> logger)
    {
        _mapper = mapper;
        _logger = logger;
        _validator = validator;
        _unitOfWork = unitOfWork;
        _todoRepository = todoRepository;
    }
    public async Task<Result<UpdateTodoCommandResponse>> Handle(UpdateTodoCommand request, CancellationToken cancellationToken)
    {
        await _validator.ValidateAndThrowAsync(request, cancellationToken);

        var existingTodo = await _todoRepository.GetByIdAsync(request.Id);

        if (existingTodo is null)
        {
            _logger.LogWarning("Todo with ID {TodoId} was not found.", request.Id);
            return Result.Fail("Todo with given Id not found");
        }
        
        _mapper.Map(request, existingTodo);

        _todoRepository.Update(existingTodo);

        await _unitOfWork.SaveChangesAsync();


        var todoToReturn = _mapper.Map<UpdateTodoCommandResponse>(existingTodo);

        return Result.Ok(todoToReturn).WithSuccess("Todo updated successfully");
    }
}