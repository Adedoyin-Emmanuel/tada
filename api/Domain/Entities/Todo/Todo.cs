using api.Domain.Entities.Base;
using api.Domain.Constants.Category;

namespace api.Domain.Entities.Todo;

public class Todo : IBase
{
    public Guid Id { get; set; }
    public string Title { get; set; }
    public Category Category { get; set; } = Category.Others;
    public bool IsDone { get; set; } = false;
    public ICollection<SubTodo.SubTodo> SubTodos { get; set; }
    public TimeOnly? DueTime { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
    
    
}