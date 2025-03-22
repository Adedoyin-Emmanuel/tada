using AutoMapper;
using api.Domain.Entities.Todo;
using api.Features.Todos.CreateTodo;

namespace api.Application.Mappings;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<CreateTodoCommand, Todo>();
        CreateMap<Todo, CreateTodoCommandResponse>()
            .ForMember(dest => dest.Category, opt => opt.MapFrom(src => src.Category.ToString()));
        
    }
}