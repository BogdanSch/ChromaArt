namespace ChromaArt.Server.Dtos;

public record PostDto(string Id, string Type, string Caption, string[] Hashtags,
    string[] Mentions, string Url, string DisplayUrl, string Alt) { }
