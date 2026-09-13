using Microsoft.AspNetCore.Mvc;

namespace ChromaArt.Server.Extenssions;
public static class ControllerBaseExtenssions
{
    public static ObjectResult BadRequestProblem(this ControllerBase controller, string detail)
    {
        return controller.Problem(detail, statusCode: StatusCodes.Status400BadRequest, title: "An error occurred.");
    }
    public static ObjectResult UnauthorizedRequestProblem(this ControllerBase controller, string detail)
    {
        return controller.Problem(detail, statusCode: StatusCodes.Status401Unauthorized, title: "An authorization error occurred.");
    }
    public static ObjectResult NotFoundRequestProblem(this ControllerBase controller, string detail)
    {
        return controller.Problem(detail, statusCode: StatusCodes.Status404NotFound, title: "A resource was not found.");
    }

}
