namespace ChromaArt.Server.Services.Interfaces;
public interface ICloudinaryService
{
    Task<ImageUploadResult> AddPhotoAsync(IFormFile file);
    Task<DeletionResult> RemoveAssetAsync(string publicId);
}