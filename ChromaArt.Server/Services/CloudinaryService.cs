using CloudinaryDotNet.Actions;
using CloudinaryDotNet;
using Microsoft.Extensions.Options;
using ChromaArt.Server.Services.Interfaces;
using ChromaArt.Server.Helpers.Settings;

namespace ChromaArt.Server.Services;

public class CloudinaryService : ICloudinaryService
{
    private readonly Cloudinary _cloudinary;
    public CloudinaryService(IOptions<CloudinarySettings> config)
    {
        Account account = new(config.Value.CloudName, config.Value.ApiKey, config.Value.ApiSecret);
        _cloudinary = new Cloudinary(account);
    }
    public async Task<ImageUploadResult> AddPhotoAsync(IFormFile file)
    {
        ImageUploadResult uploadResult = new();

        if (file.Length > 0)
        {
            using Stream stream = file.OpenReadStream();

            ImageUploadParams uploadParams = new()
            {
                File = new FileDescription(file.FileName, stream),
                Transformation = new Transformation().Crop("fill").Gravity("face")
            };
            uploadResult = await _cloudinary.UploadAsync(uploadParams);
        }
        return uploadResult;
    }
    public async Task<DeletionResult> RemoveAssetAsync(string publicId)
    {
        DeletionParams deletionParams = new(publicId);
        return await _cloudinary.DestroyAsync(deletionParams);
    }
    //public string FetchAssetAsync(string assetUrl)
    //{
    //    string encodedUrl = Uri.EscapeDataString(assetUrl);

    //    string cloudName = _cloudinary.Api.Account.Cloud;
    //    string safeUrl = $"https://res.cloudinary.com/{cloudName}/image/fetch/{encodedUrl}";

    //    return safeUrl;
    //}
}
