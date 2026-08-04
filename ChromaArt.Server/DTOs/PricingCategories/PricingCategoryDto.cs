namespace ChromaArt.Server.DTOs.PricingCategories;
public record PricingCategoryDto(int Id, string Name, string Description,
    decimal StartingPrice, string PreviewUrl, int DisplayOrder, bool IsActive) {}
