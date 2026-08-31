using ChromaArt.Server.Helpers;
using FluentEmail.Core;
using ChromaArt.Server.Services.Interfaces;

namespace ChromaArt.Server.Services;
public class EmailService(IFluentEmail fluentEmail) : IEmailService
{
    private readonly string _templatesPath = Path.Combine(
            AppContext.BaseDirectory,
            "Templates",
            "EmailTemplates"
        );
    private readonly IFluentEmail _fluentEmail = fluentEmail;
    public async Task SendAsync(EmailMetadata emailMetadata)
    {
        await _fluentEmail.To(emailMetadata.ToAddress)
            .Subject(emailMetadata.Subject)
            .Body(emailMetadata.Body)
            .SendAsync();
    }
    public async Task SendPasswordResetMessageAsync(EmailMetadata emailMetadata, string callback)
    {
        string templatePath = Path.Combine(
            _templatesPath,
            "PasswordResetMessage.cshtml"
        );
        await _fluentEmail.To(emailMetadata.ToAddress)
            .Subject(emailMetadata.Subject)
            .UsingTemplateFromFile(templatePath, callback)
            .SendAsync();
    }
}
