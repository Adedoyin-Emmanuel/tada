using Serilog;
using Scalar.AspNetCore;
using api.Infrastructure.Middlewares;
using api.Infrastructure.Extensions.ApplicationBuilder;

var builder = WebApplication.CreateBuilder(args);
{
    builder.Services
        .AddCustomServices()
        .AddApiDocsAndVersion()
        .AddPersistence()
        .AddAutomapperAndMediatR()
        .AddHttpContextAccessor()
        .AddControllers();
    
    builder.Host.AddCustomLogging();
}

var app = builder.Build();

{
    app.UseMiddleware<GlobalExceptionHandlingMiddleware>();
    
    if (app.Environment.IsDevelopment())
    {
        app.MapOpenApi();
        app.MapScalarApiReference();
        
    }
    
    app.UseSerilogRequestLogging();
    app.UseHttpsRedirection();
    app.UseAuthorization();
    app.MapControllers();
    app.Run();
    
};

