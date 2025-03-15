using api.Domain.Constants.Category;
using api.Domain.Entities.Todo;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace api.Infrastructure.Persistence.Configurations.Todos;

public class TodoConfiguration : IEntityTypeConfiguration<Todo>
{
    public void Configure(EntityTypeBuilder<Todo> builder)
    {
        builder.HasKey(todo => todo.Id);

        builder.Property(todo => todo.Title).IsRequired().HasMaxLength(100);

        builder.Property(todo => todo.Category).HasDefaultValue(Category.Others);

        builder.Property(todo => todo.IsDone).HasDefaultValue(false);

        builder.HasMany(todo => todo.SubTodos);

        builder.Property(todo => todo.DueDate).IsRequired(false);

        builder.Property(todo => todo.CreatedAt).ValueGeneratedOnAdd();

        builder.Property(todo => todo.UpdatedAt).ValueGeneratedOnAddOrUpdate();
    }
}   