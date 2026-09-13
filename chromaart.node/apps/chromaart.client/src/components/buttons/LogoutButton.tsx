import { useNavigate } from "@tanstack/react-router";
import { Button } from "react-bootstrap";
import { useAuth } from "jwt-react/context/AuthContext";

export function LogoutButton() {
  const navigate = useNavigate();
  const { logoutUser } = useAuth();
  const handleLogout = async (): Promise<void> => {
    await logoutUser();
    navigate({
      to: "/",
      replace: true,
      search: { message: "You have been logged out." },
    });
  };

  return (
    <Button variant="danger" className="w-100" onClick={handleLogout}>
      Logout <i className="bi bi-box-arrow-left" />
    </Button>
  );
}
