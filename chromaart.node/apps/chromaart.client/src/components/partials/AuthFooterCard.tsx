import { Link } from "@tanstack/react-router";
import { Card } from "react-bootstrap";

export function AuthFooterCard() {
  return (
    <Card className="auth__card mt-3">
      <Card.Body className="text-center">
        <p className="auth__footer-text">
          Remember your password?{" "}
          <Link to="/auth/login" className="auth__link">
            Log in
          </Link>
        </p>
      </Card.Body>
    </Card>
  );
}
