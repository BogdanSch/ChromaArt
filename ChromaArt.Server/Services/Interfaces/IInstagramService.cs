using ChromaArt.Server.DTOs.Posts;
using ChromaArt.Server.Helpers;

namespace ChromaArt.Server.Services.Interfaces;

public interface IInstagramService
{
    Task<PostDto[]> GetPostsAsync(Query query);
    PostDto[] FilterPosts(PostDto[] posts, string[] hashtags);
    Task<(Stream, string)?> FetchImagesAsync(string url);
}
