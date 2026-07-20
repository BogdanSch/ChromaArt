using System.ComponentModel.DataAnnotations;

namespace ChromaArt.Server.Models;
class PricingCategory
{
    [Key]
    public required int Id { get; set; }
    [StringLength(80, MinimumLength = 3, ErrorMessage = "Name must be between 3 and 80 characters")]
    public required string Name { get; set; }
    [MinLength(5, ErrorMessage = "Description must be at least 5 characters")]
    public required string Description { get; set; }
    [Range(0, 10e10, ErrorMessage = "Price must be a positive number")]
    public required decimal Price { get; set; }
    public required string PreviewUrl { get; set; }
    [Range(0, 10e6, ErrorMessage = "Display order must be a positive number")]
    public required int DisplayOrder { get; set; } = 0;
    public required bool IsActive { get; set; } = true;
}