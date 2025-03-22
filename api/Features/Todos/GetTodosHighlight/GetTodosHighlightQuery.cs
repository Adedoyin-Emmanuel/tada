using MediatR;
using FluentResults;

namespace api.Features.Todos.GetTodosHighlight;

public class GetTodosHighlightQuery : IRequest<Result<GetTodosHighlightQueryResponse>>
{
    
}