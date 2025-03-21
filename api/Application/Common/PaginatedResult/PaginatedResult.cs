namespace api.Application.Common.PaginatedResult;

public class PaginatedResult<T>
{
    public List<T> Items { get; set; }
    public Guid NextCursor { get; set; }
    public int Limit { get; set; }
}