using MediatR;
using FluentResults;
using FluentValidation;
using api.Features.Todos.Repository;
using api.Infrastructure.Repositories;

namespace api.Features.Todos.DeleteTodo;

public class DeleteCommandHandler : IRequestHandler<DeleteTodoCommand, Result>
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly ITodoRepository _todoRepository;
    private readonly ILogger<DeleteCommandHandler> _logger;
    private readonly IValidator<DeleteTodoCommand> _validator;


    public DeleteCommandHandler(ITodoRepository todoRepository, ILogger<DeleteCommandHandler> logger, IValidator<DeleteTodoCommand> validator, IUnitOfWork unitOfWork)
    {
        _logger = logger;
        _validator = validator;
        _unitOfWork = unitOfWork;
        _todoRepository = todoRepository;
    }

    public async Task<Result> Handle(DeleteTodoCommand request, CancellationToken cancellationToken)
    {
        await _validator.ValidateAndThrowAsync(request, cancellationToken);

        var existingTodo = await _todoRepository.GetByIdAsync(request.Id);

        if (existingTodo is null)
        {
            return Result.Fail("Todo with given id not found");
        }

        await _todoRepository.DeleteAsync(request.Id);
        
        await _unitOfWork.SaveChangesAsync();

        return  Result.Ok();
    }
}