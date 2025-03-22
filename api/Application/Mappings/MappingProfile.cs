using AutoMapper;
using api.Domain.Entities.Todo;
using api.Features.Todos.CreateTodo;
using api.Features.Todos.UpdateTodo;
using api.Features.Todos.GetTodoById;

namespace api.Application.Mappings;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<CreateTodoCommand, Todo>();
        CreateMap<Todo, CreateTodoCommandResponse>()
            .ForMember(dest => dest.Category, opt => opt.MapFrom(src => src.Category.ToString()));
        CreateMap<Todo, GetTodoByIdQueryResponse>()
            .ForMember(dest => dest.Category, opt => opt.MapFrom(src => src.Category.ToString()));

        CreateMap<UpdateTodoCommand, Todo>();

        CreateMap<Todo, UpdateTodoCommandResponse>()
            .ForMember(dest => dest.Category, opt => opt.MapFrom(src => src.Category.ToString()));
    }
}