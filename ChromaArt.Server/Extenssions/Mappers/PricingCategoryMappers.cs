using ChromaArt.Server.DTOs.PricingCategories;
using ChromaArt.Server.Models;

namespace ChromaArt.Server.Extenssions.Mappers;

public static class PricingCategoryMappers
{
    public static PricingCategoryDto ToDto(this PricingCategory model) =>
        new(model.Id, model.Name, model.Description, model.StartingPrice, model.PreviewUrl, model.DisplayOrder, model.IsActive);
}
