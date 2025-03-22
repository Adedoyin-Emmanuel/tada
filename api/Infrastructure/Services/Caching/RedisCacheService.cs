using System.Text.Json;
using api.Utils;
using StackExchange.Redis;

namespace api.Infrastructure.Services.Caching;

public class RedisCacheService : IRedisCacheService
{
    private readonly IDatabase _db;
    private readonly IConnectionMultiplexer _redis;


    public RedisCacheService()
    {
        _redis = ConnectionMultiplexer.Connect(EnvConfig.RedisConnectionString);
        _db = _redis.GetDatabase();
    }


    public async Task SetAsync<T>(string key, T value, TimeSpan expiration)
    {
        var json = JsonSerializer.Serialize(value);
        await _db.StringSetAsync(key, json, expiration);
    }


    public async Task<T?> GetAsync<T>(string key)
    {
        var json = await _db.StringGetAsync(key);

        return json.HasValue ? JsonSerializer.Deserialize<T>(json.ToString()) : default;
    }

    public async Task<bool> DeleteAsync(string key)
    {
        return await _db.KeyDeleteAsync(key);
    }
}