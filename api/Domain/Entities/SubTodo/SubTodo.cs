namespace api.Domain.Entities.SubTodo;

public record SubTodo
{
    public string Title { get; set; }
    public bool IsDone { get; set; }
    
}