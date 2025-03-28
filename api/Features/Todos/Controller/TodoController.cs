using MediatR;
using FluentResults;
using Asp.Versioning;
using Microsoft.AspNetCore.Mvc;
using api.Application.Responses;
using api.Features.Todos.CreateTodo;
using api.Features.Todos.DeleteTodo;
using api.Features.Todos.UpdateTodo;
using api.Features.Todos.GetTodoById;
using api.Features.Todos.GetAllTodos;
using api.Features.Todos.GetTodosHighlight;

namespace api.Features.Todos.Controller;

[ApiVersion(1)]
[ApiController]
[Route("v{version:apiVersion}/[controller]")]
[Produces("application/json")]
[Consumes("application/json")]
public class TodoController : ControllerBase
{
    private readonly IMediator _mediator;
    private readonly IResponse _response;
    private readonly ILogger<TodoController> _logger;


    public TodoController(IMediator mediator, IResponse response, ILogger<TodoController> logger)
    {
        _mediator = mediator;
        _response = response;
        _logger = logger;
    }

    [HttpPost]
    public async Task<IActionResult> CreateTodo(CreateTodoCommand command)
    {
        _logger.LogInformation("Received CreateTodo request with Category: {Category} (Type: {CategoryType})", 
            command.Category, 
            command.Category.GetType().FullName);
        
        var createTodoResult = await _mediator.Send(command);
        
        _logger.LogInformation("CreateTodo result: {Result}", createTodoResult);

        if (createTodoResult.IsSuccess)
        {
            return Ok(_response.Ok(
                data: createTodoResult.ValueOrDefault,
                message: "Todo created successfully"
            ));
        }

        var errors = createTodoResult.Errors.Select(error => error.Message);
        return BadRequest(_response.BadRequest(errors));
    }

    [HttpGet]
    public async Task<IActionResult> GetTodos([FromQuery] GetAllTodosQuery query)
    {
        return await HandleMediatorResult(_mediator.Send(query));
    }

    [HttpGet]
    [Route("{id:guid}")]
    public async Task<IActionResult> GetTodoById(Guid id)
    {
        var query = new GetTodoByIdQuery { Id = id };

        var getTodoByIdResult = await _mediator.Send(query);

        if (getTodoByIdResult.IsFailed)
        {
            return NotFound(_response.NotFound(getTodoByIdResult.Errors.FirstOrDefault()!.Message));
        }

        return Ok(_response.Ok(getTodoByIdResult.ValueOrDefault));
    }

    [HttpGet]
    [Route("highlight")]
    public async Task<IActionResult> GetTodosHighlight([FromQuery] GetTodosHighlightQuery query)
    {
        return await HandleMediatorResult(_mediator.Send(query));
    }

    [HttpPatch]
    [Route("{id:guid}")]
    public async Task<IActionResult> UpdateTodo([FromBody] UpdateTodoCommand updateTodoCommand, [FromRoute] Guid id)
    {
        var command = updateTodoCommand with { Id = id };

        var updateTodoResult = await _mediator.Send(command);

        if (updateTodoResult.IsFailed)
        {
            var errors = updateTodoResult.Errors.Select(error => error.Message);
            return NotFound(_response.NotFound(errors!.FirstOrDefault()!));
        }

        return Ok(_response.Ok(message: updateTodoResult?.Successes?.FirstOrDefault()!.Message!, data: updateTodoResult!.Value));
    }

    [HttpDelete]
    [Route("{id:guid}")]
    public async Task<IActionResult> DeleteTodoById(Guid id)
    {
        var command = new DeleteTodoCommand { Id = id };

        var deleteTodoResult = await _mediator.Send(command);

        if (deleteTodoResult.IsFailed)
        {
            return NotFound(_response.NotFound("Todo with given Id not found"));
        }


        return Ok(_response.Ok(message: "Todo deleted successfully", data: null));
    }
    

    private async Task<IActionResult> HandleMediatorResult<T>(Task<Result<T>> task)
    {
        var result = await task;

        if (result.IsSuccess)
        {
            var data = result.ValueOrDefault;
            var success = result.Successes.FirstOrDefault();
            var message = success?.Message ?? "Operation successful";

            return Ok(_response.Ok(data, message));
        }
        
        var errors = result.Errors.Select(error => error.Message);

        return BadRequest(_response.BadRequest(errors));
    }
}