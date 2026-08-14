using ChromaArt.Server.DTOs.SocialLinks;
using ChromaArt.Server.Models;

namespace ChromaArt.Server.Extenssions.Mappers;
public static class SocialLinkMappers
{
    public static SocialLinkDto ToDto(this SocialLink model)
    {
        return new SocialLinkDto(model.Id, model.PlatformName, model.Url);
    }
}
