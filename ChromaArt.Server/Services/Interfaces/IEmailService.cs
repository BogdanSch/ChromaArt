using ChromaArt.Server.Helpers;

namespace ChromaArt.Server.Services.Interfaces;
public interface IEmailService
{
    Task SendAsync(EmailMetadata emailMetadata);
    Task SendPasswordResetMessageAsync(EmailMetadata emailMetadata, string callback);
}
