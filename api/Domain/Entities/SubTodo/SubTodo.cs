namespace api.Domain.Entities.SubTodo;

public record SubTodo
{
    public int Id { get; set; }
    public string Title { get; set; }
    public bool IsDone { get; set; }
    
}