using api.Utils;
using FluentValidation;
using api.Application.Responses;


namespace api.Infrastructure.Middlewares;

public class GlobalExceptionHandlingMiddleware : IMiddleware
{
    private readonly IResponse _response;
    private readonly ILogger<GlobalExceptionHandlingMiddleware> _logger;


    public GlobalExceptionHandlingMiddleware(IResponse response, ILogger<GlobalExceptionHandlingMiddleware> logger)
    {
        _response = response;
        _logger = logger;
    }
    
    
    public async Task InvokeAsync(HttpContext context, RequestDelegate next)
    {
        try
        {
            await next(context);
        }
        catch (Exception e)
        {
          _logger.LogError(e,"An unhandled exception has occurred");
          await HandleExceptionAsync(context, e);
        }
    }

    private async Task HandleExceptionAsync(HttpContext context, Exception exception)
    {
        var requestId = context.TraceIdentifier;
        var requestPath = context.Request.Path;
        
        context.Response.ContentType = "application/json";
        context.Response.Headers["X-Request-Id"] = requestId;

        switch (exception)
        {
            case ValidationException validationException:
                context.Response.StatusCode = (int)StatusCodes.Status400BadRequest;
                await context.Response.WriteAsJsonAsync(_response.BadRequest(
                    errors: validationException.Errors.Select(e => e.ErrorMessage),
                    message: "One or two validation errors occurred"));
                break;
            
            default:
                context.Response.StatusCode = (int)StatusCodes.Status500InternalServerError;

                var error = exception.Message;
                
                await context.Response.WriteAsJsonAsync(_response.InternalServerError(errors: null, message: EnvConfig.IsProduction ? "An unknown error occurred" : error));
                
                break;
                
        }
    }
}