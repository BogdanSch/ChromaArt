using ChromaArt.Server.Dtos;

namespace ChromaArt.Server.Mappers;

public static class PostsMapper
{
    public static PostDto ToPostDto(this Dictionary<string, object> item)
    {
        return new PostDto(
            item["id"].ToString() ?? string.Empty,
            item["type"].ToString() ?? string.Empty,
            item["caption"].ToString() ?? string.Empty,
            (string[])item["hashtags"],
            (string[])item["mentions"],
            item["url"].ToString() ?? string.Empty,
            item["displayUrl"].ToString() ?? string.Empty,
            item["alt"].ToString() ?? string.Empty
        );
    }
}
