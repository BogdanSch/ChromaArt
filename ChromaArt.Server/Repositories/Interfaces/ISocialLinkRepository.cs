using ChromaArt.Server.Helpers;
using ChromaArt.Server.Models;

namespace ChromaArt.Server.Repositories.Interfaces;
public interface ISocialLinkRepository : IEntityWriter<SocialLink>
{
    Task<SocialLink[]> GetAllAsync(Query query);
}
