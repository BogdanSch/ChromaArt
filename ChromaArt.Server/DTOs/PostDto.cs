using System.Text.Json.Serialization;

namespace ChromaArt.Server.DTOs;
public record PostDto
{
    [JsonPropertyName("id")]
    public required string Id { get; init; }
    [JsonPropertyName("type")]
    public required string Type { get; init; }
    [JsonPropertyName("caption")]
    public required string Caption { get; init; }
    [JsonPropertyName("hashtags")]
    public required string[] Hashtags { get; init; }
    [JsonPropertyName("mentions")]
    public required string[] Mentions { get; init; }
    [JsonPropertyName("url")]
    public required string Url { get; init; }
    [JsonPropertyName("displayUrl")]
    public required string DisplayUrl { get; set; }
    [JsonPropertyName("alt")]
    public required string Alt { get; init; }
}
