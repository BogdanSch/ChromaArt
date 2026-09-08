import { createFileRoute, Link } from "@tanstack/react-router";
import { Container, Card } from "react-bootstrap";
import { LoginForm } from "@/containers";

export const Route = createFileRoute("/auth/login")({
  component: Login,
});

function Login() {
  return (
    <section className="auth">
      <Container>
        <div className="auth__wrap">
          <Card className="auth__card mb-3">
            <Card.Body className="p-4 p-md-5">
              <h2 className="auth__title text-center mb-4">Log in</h2>
              <LoginForm />
            </Card.Body>
          </Card>
          <Card className="auth__card">
            <Card.Body className="text-center">
              <Link className="auth__link" to="/auth/forgot-password">
                Forgot Password?
              </Link>
            </Card.Body>
          </Card>
        </div>
      </Container>
    </section>
  );
}
