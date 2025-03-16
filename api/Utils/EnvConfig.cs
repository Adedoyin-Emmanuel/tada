using dotenv.net;

namespace api.Utils;

public static  class EnvConfig
{
    static EnvConfig()
    {
        DotEnv.Load();
    }

    public static string DatabaseUrl => Environment.GetEnvironmentVariable("DATABASE_URL");
    public static string RedisConnectionString => Environment.GetEnvironmentVariable("REDIS_CONNECTION_STRING");
    public static bool IsProduction => String.Equals(Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT"),
        "Production", StringComparison.OrdinalIgnoreCase);
    
}