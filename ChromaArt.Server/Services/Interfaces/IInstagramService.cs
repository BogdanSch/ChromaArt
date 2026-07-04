using ChromaArt.Server.Dtos;

namespace ChromaArt.Server.Services.Interfaces;

public interface IInstagramService
{
    Task<PostDto[]> GetPostsAsync();
    Task<PostDto[]> FilterPosts(PostDto[] posts, string[] hashtags);
}
