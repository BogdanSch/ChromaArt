namespace ChromaArt.Server.Repositories.Interfaces;

public interface IEntityWriter<T>
{
    Task<bool> AddAsync(T item);
    Task<bool> UpdateAsync(T item);
    Task<bool> DeleteAsync(T item);
    Task<bool> SaveAsync();
}