namespace api.Infrastructure.Services.Caching;

public interface IRedisCacheService
{ 
    Task SetAsync<T>(string key, T value, TimeSpan expiration);
    
    Task<T?> GetAsync<T>(string key);
    
    Task<bool> DeleteAsync(string key);

}