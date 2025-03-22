using api.Domain.Entities.SubTodo;

namespace api.Features.Todos.GetTodoById;

public record GetTodoByIdQueryResponse
{
    public Guid Id { get; set; }
    public string Title { get; set; }
    public string Category { get; set; }
    public bool IsDone { get; set; }    
    public List<SubTodo>? SubTodos { get; set; }
    public TimeOnly? DueTime { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
}
