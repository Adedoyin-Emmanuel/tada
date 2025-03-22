using api.Application.Common.PaginatedResult;

namespace api.Features.Todos.GetAllTodos;

public class GetAllTodosQueryResponse
{
    public PaginatedResult<GetAllTodosQueryItem> Items;
    public Guid? NextCursor;
    public int? Limit;
}

public class GetAllTodosQueryItem
{
    public Guid Id { get; set; }
    public string Title { get; set; }
    public string Category { get; set; }
    public bool IsDone { get; set; }
    public List<SubTodoDto> SubTodos { get; set; }
    public TimeOnly? DueTime { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }

}

public class SubTodoDto
{
    public string Title { get; set; }
    public bool IsDone { get; set; }
}