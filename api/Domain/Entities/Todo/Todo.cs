using api.Domain.Entities.Base;

namespace api.Domain.Entities.Todo;

public class Todo : IBase
{
    public Guid Id { get; set; }
    public string Title { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
}