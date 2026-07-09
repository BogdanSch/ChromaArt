using System.Text.Json.Serialization;

namespace ChromaArt.Server.Dtos;

public record PostDto(
    [JsonPropertyName("id")] string Id, 
    [JsonPropertyName("type")] string Type, 
    [JsonPropertyName("caption")] string Caption, 
    [JsonPropertyName("hashtags")] string[] Hashtags,
    [JsonPropertyName("mentions")] string[] Mentions, 
    [JsonPropertyName("url")] string Url, 
    [JsonPropertyName("displayUrl")] string DisplayUrl, 
    [JsonPropertyName("alt")] string Alt
);
