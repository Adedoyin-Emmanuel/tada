namespace api.Domain.Entities.Base;

public interface IBase
{ 
    public Guid Id { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
}