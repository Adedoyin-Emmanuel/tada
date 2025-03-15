using MediatR;
using FluentResults;

namespace api.Application.Behaviours;

public sealed class LoggingPipelineBehaviour<TRequest, TResponse>: IPipelineBehavior<TRequest, TResponse> where TRequest: IRequest<TResponse> where TResponse: Result
{


    private readonly ILogger<LoggingPipelineBehaviour<TRequest, TResponse>> _logger;


    public LoggingPipelineBehaviour(ILogger<LoggingPipelineBehaviour<TRequest, TResponse>> logger)
    {
        _logger = logger;
    }
    public async Task<TResponse> Handle(TRequest request, RequestHandlerDelegate<TResponse> next, CancellationToken cancellationToken)
    {
        var requestName = typeof(TRequest).Name; 
        var timestamp = DateTime.UtcNow;
        
      _logger.LogInformation("Starting Request {@RequestName}, {@DateTimeUtc}", requestName, timestamp);

      var result = await next();

      if (result.IsFailed)
      {
        _logger.LogError("Reqeust Failure {@RequestName}, {@DateTimeUtc}", requestName, timestamp);
          
      }
      
      _logger.LogInformation("Finished Request {@RequestName}, {@DateTimeUtc}", requestName, timestamp);

      return result;
    }
}