using api.Domain.Constants.Category;
using Microsoft.EntityFrameworkCore;
using api.Infrastructure.Persistence;
using api.Infrastructure.Repositories;
using api.Application.Common.CategoryDetails;

namespace api.Features.Todos.Repository;

public class TodoRepository : Repository<Domain.Entities.Todo.Todo>, ITodoRepository
{
    
    public TodoRepository(AppDbContext context) : base(context)
    {
    }

    public async Task<CategoryDetails> GetAllTodoCategories()
    {
        var allTodos = await _context.Todos.ToListAsync();

        var categoryDetails = new CategoryDetails
        {
            HealthCategoryTotal = allTodos.Count(todo => todo.Category == Category.Health),
            WorkCategoryTotal = allTodos.Count(todo => todo.Category == Category.Work),
            MentalHealthCategoryTotal = allTodos.Count(todo => todo.Category == Category.MentalHealth),
            OthersCategoryTotal = allTodos.Count(todo => todo.Category == Category.Others)

        };

        return categoryDetails;
    }
}