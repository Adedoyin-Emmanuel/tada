using MediatR;
using FluentResults;
using Asp.Versioning;
using Microsoft.AspNetCore.Mvc;
using api.Application.Responses;
using api.Features.Todos.CreateTodo;

namespace api.Features.Todos.Controller;

[ApiVersion(1)]
[ApiController]
[Route("v{version:apiVersion}/[controller]")]
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
    public async Task<IActionResult> CreateTodo([FromForm] CreateTodoCommand command)
    {
        var createTodoResult = await _mediator.Send(command);

        if (createTodoResult.IsSuccess)
        {
            return Created("",
                _response.Created(message: createTodoResult.Successes!.FirstOrDefault()!.Message,
                    data: createTodoResult.ValueOrDefault));
        }

        var errors = createTodoResult.Errors.Select(error => error.Message);

        return BadRequest(_response.BadRequest(errors));

    }

    [HttpGet]
    public async Task<IActionResult> GetTodos()
    {
        return Ok(_response.Ok());
    }

    [HttpGet]
    [Route("{id:guid}")]
    public async Task<IActionResult> GetTodoById(Guid id)
    {
        return Ok(_response.Ok());

    }

    [HttpPut]
    [Route("{id:guid}")]
    public async Task<IActionResult> UpdateTodo(Guid id)
    {
        return Ok(_response.Ok());
    }

    [HttpDelete]
    [Route("{id:guid}")]
    public async Task<IActionResult> DeleteTodoById(Guid id)
    {
        return Ok(_response.Ok());
    }
    

    private async Task<IActionResult> HandleMediatorRequest<T>(Task<Result<T>> task)
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