import { createFileRoute } from "@tanstack/react-router";
import { Container } from "react-bootstrap";

export const Route = createFileRoute("/auth/login")({
  component: Login,
});

function Login() {
  return <section className="auth">
    <Container>
      <div className="auth__wrap">
        
      </div>
    </Container>
  </section>;
}
