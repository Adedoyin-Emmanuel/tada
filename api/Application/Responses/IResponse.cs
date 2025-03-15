namespace api.Application.Responses;

public interface IResponse
{
    object Created(object? data = null, string? message = "Resource created successfully");
    object Ok(object? data = null, string? message = "Operation successful");
    object BadRequest(object? errors, string? message = "Invalid request");
    object NotFound(string message = "Resource not found");
    object Unauthorized(string message = "Unauthorized. Please login");
    object Forbidden(string message = "Forbidden. Insufficient rights");
    object InternalServerError(object? errors, string message = "An unknown error has occurred");

}