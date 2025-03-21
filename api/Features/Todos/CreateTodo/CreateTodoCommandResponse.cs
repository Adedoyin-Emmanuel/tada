using api.Domain.Constants.Category;
using api.Domain.Entities.SubTodo;

namespace api.Features.Todos.CreateTodo;

public record CreateTodoCommandResponse
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