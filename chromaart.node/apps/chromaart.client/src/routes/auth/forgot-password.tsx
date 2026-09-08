import { createFileRoute } from "@tanstack/react-router";
import { Card, Container } from "react-bootstrap";
import { ForgotPasswordForm } from "@/containers";
import { AuthFooterCard } from "@/components";

export const Route = createFileRoute("/auth/forgot-password")({
  component: ForgotPassword,
});

function ForgotPassword() {
  return (
    <section className="auth">
      <Container>
        <div className="auth__wrap">
          <Card className="auth__card shadow-lg">
            <Card.Body className="p-4 p-md-5">
              <h2 className="auth__title mb-2">Forgot Password?</h2>
              <p className="text-muted mb-4">
                Enter the email address associated with your account, and we'll
                send you a link to reset your password.
              </p>
              <ForgotPasswordForm />
            </Card.Body>
          </Card>
          <AuthFooterCard />
        </div>
      </Container>
    </section>
  );
}
