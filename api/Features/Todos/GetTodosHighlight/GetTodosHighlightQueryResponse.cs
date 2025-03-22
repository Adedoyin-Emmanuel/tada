namespace api.Features.Todos.GetTodosHighlight;

public record GetTodosHighlightQueryResponse
{
     public int HealthCategoryTotal { get; set; }
        
     public int WorkCategoryTotal { get; set; }
        
     public int MentalHealthCategoryTotal { get; set; }
        
     public int OthersCategoryTotal { get; set; }
}