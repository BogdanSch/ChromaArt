using ChromaArt.Server.DTOs;
using ChromaArt.Server.Helpers;

namespace ChromaArt.Server.Services.Interfaces;

public interface IInstagramService
{
    Task<PostDto[]> GetPostsAsync(Query query);
    Task<PostDto[]> FilterPosts(PostDto[] posts, string[] hashtags);
}
