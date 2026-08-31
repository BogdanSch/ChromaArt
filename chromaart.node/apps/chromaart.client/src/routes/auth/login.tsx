import { createFileRoute } from "@tanstack/react-router";
import { Container, Card, Button } from "react-bootstrap";
import { LoginForm } from "@/containers";
import axios from "axios";
import { API_URL } from "shared/variables";

export const Route = createFileRoute("/auth/login")({
  component: Login,
});

function Login() {
  const handleForgotPassword = async (): Promise<void> => {
    try {
      await axios.post(`${API_URL}/accounts/forgot-password`);
    } catch (e) {
      let errorMessage: string = "Couldn't send the password reset link.";
      if (axios.isAxiosError(e) && e.response && e.response.data) {
        errorMessage = e.response.data.message;
      }
      console.error(errorMessage, e);
      throw new Error(errorMessage);
    }
  };

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
              <Button className="auth__link" onClick={handleForgotPassword}>
                Forgot Password?
              </Button>
            </Card.Body>
          </Card>
        </div>
      </Container>
    </section>
  );
}
