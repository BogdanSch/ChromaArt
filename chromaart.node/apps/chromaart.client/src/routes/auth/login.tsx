import { createFileRoute, Link } from "@tanstack/react-router";
import { Container, Row, Col, Card } from "react-bootstrap";
import { LoginForm } from "@/containers";
import "./login.scss";

export const Route = createFileRoute("/auth/login")({
  component: Login,
});

function Login() {
  return (
    <section className="auth">
      <Container>
        <Row className="auth__wrap">
          <Col xs={12} md={8} lg={6}>
            <Card className="text-center mt-3 mb-4">
              <Card.Body>
                <Link to="/" className="auth__logo">
                  ChromaArt
                </Link>
              </Card.Body>
            </Card>
            <Card className="auth__card shadow-lg mb-3">
              <Card.Body className="p-4 p-md-5">
                <h2 className="auth__title text-center mb-4">Log in</h2>
                <LoginForm />
              </Card.Body>
            </Card>
            <Card>
              <Card.Body className="text-center">
                <Link to="/auth/forgot-password" className="auth__link">
                  Forgot Password?
                </Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
