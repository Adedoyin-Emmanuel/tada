namespace api.Domain.Entities.Base;

public interface IBase
{
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
}