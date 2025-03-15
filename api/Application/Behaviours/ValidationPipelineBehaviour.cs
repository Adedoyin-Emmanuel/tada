using MediatR;
using FluentValidation;
using FluentValidation.Results;


namespace api.Application.Behaviours;

public class ValidationPipelineBehaviour<TRequest, TResponse> : IPipelineBehavior<TRequest, TResponse> where TRequest: class
{
    
    private readonly IEnumerable<IValidator<TRequest>> _validators;

    public ValidationPipelineBehaviour(IEnumerable<IValidator<TRequest>> validators)
    {
        _validators = validators;
    }
    public async Task<TResponse> Handle(TRequest request, RequestHandlerDelegate<TResponse> next, CancellationToken cancellationToken)
    {
        var context = new ValidationContext<TRequest>(request);
        var validationFailures = await Task.WhenAll(_validators.Select(v => v.ValidateAsync(context, cancellationToken)));


        var errors = validationFailures.Where(validationResult => !validationResult.IsValid)
            .SelectMany(validationResult => validationResult.Errors)
            .Select(validationFailure =>
                new ValidationFailure(validationFailure.PropertyName, validationFailure.ErrorMessage))
            .ToList();


        if (errors.Any())
        {
            throw new ValidationException(errors);
        }

        return await next();
    }
}