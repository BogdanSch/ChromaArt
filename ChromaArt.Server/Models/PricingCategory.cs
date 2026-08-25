using ChromaArt.Server.DTOs.PricingCategories;
using System.ComponentModel.DataAnnotations;

namespace ChromaArt.Server.Models;
public class PricingCategory
{
    [Key]
    [Required]
    public int Id { get; set; }
    [StringLength(80, MinimumLength = 3, ErrorMessage = "Name must be between 3 and 80 characters")]
    public required string Name { get; set; }
    [MinLength(5, ErrorMessage = "Description must be at least 5 characters")]
    public required string Description { get; set; }
    [Range(0, 10e10, ErrorMessage = "Starting price must be a positive number")]
    public required decimal StartingPrice { get; set; }
    public required string PreviewUrl { get; set; }
    [Range(0, 10e6, ErrorMessage = "Display order must be a positive number")]
    public required int DisplayOrder { get; set; } = 0;
    public required bool IsActive { get; set; } = true;
    public PricingCategoryDto ToDto() =>
        new(Id, Name, Description, StartingPrice, PreviewUrl, DisplayOrder, IsActive);
}