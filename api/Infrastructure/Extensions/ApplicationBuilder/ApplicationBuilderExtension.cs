using MediatR;
using Serilog;
using api.Utils;
using FluentValidation;
using Microsoft.AspNetCore.Mvc;
using api.Application.Responses;
using api.Application.Behaviours;
using api.Features.Todos.Repository;
using Microsoft.EntityFrameworkCore;
using api.Infrastructure.Middlewares;
using api.Infrastructure.Persistence;
using api.Infrastructure.Repositories;
using api.Infrastructure.Extensions.Services;

namespace api.Infrastructure.Extensions.ApplicationBuilder;

public static  class ApplicationBuilderExtension
{
    public static IServiceCollection AddCustomServices(this IServiceCollection services)
    {
        services.AddScoped<IUnitOfWork, UnitOfWork>();
        services.AddScoped(typeof(IRepository<>), typeof(Repository<>));
        services.AddScoped<ITodoRepository, TodoRepository>();
        services.AddScoped<IResponse, Response>();

        services.AddScoped(typeof(IPipelineBehavior<,>), typeof(LoggingPipelineBehaviour<,>));

        services.AddTransient<GlobalExceptionHandlingMiddleware
        >();
        
        services.Configure<ApiBehaviorOptions>(options =>
        {
            options.SuppressModelStateInvalidFilter = true;
        });


        return services;
    }

    public static IServiceCollection AddApiDocsAndVersion(this IServiceCollection services)
    {
        services.AddEndpointsApiExplorer();
        services.AddCustomApiVersion();
        services.AddOpenApi();

        return services;
    }

    public static IServiceCollection AddPersistence(this IServiceCollection services)
    {
        var mySqlVersion = new MySqlServerVersion(new Version(8, 0, 36));

        services.AddDbContext<AppDbContext>(options => options.UseMySql(EnvConfig.DatabaseUrl, mySqlVersion));

        return services;
    }

    public static IServiceCollection AddAutomapperAndMediatR(this IServiceCollection services)
    {
        services.AddAutoMapper(typeof(Program).Assembly);

        services.AddMediatR(configuration =>
        {
            configuration.RegisterServicesFromAssembly(typeof(Program).Assembly);
            configuration.AddOpenBehavior(typeof(ValidationPipelineBehaviour<,>));

        });

        services.AddValidatorsFromAssembly(typeof(Program).Assembly);

        return services;

    }

    public static void AddCustomLogging(this IHostBuilder hostBuilder)
    {
        hostBuilder.UseSerilog((context, configuration) => configuration.ReadFrom.Configuration(context.Configuration));
    }
}