export function getIconClass(platformName: string): string {
  switch (platformName.toLowerCase()) {
    case "facebook":
      return "bi-facebook";
    case "email":
      return "bi-envelope-at";
    case "instagram":
      return "bi-instagram";
    default:
      return "";
  }
}
