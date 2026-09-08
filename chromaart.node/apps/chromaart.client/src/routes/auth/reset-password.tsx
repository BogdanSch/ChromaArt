import { AuthFooterCard } from "@/components";
import { ResetPasswordForm } from "@/containers";
import { createFileRoute } from "@tanstack/react-router";
import { Container, Card } from "react-bootstrap";

export const Route = createFileRoute("/auth/reset-password")({
  component: ResetPassword,
});

function ResetPassword() {
  const { token, email } = Route.useSearch();

  return (
    <section className="auth auth--reset">
      <Container>
        <div className="auth__wrap">
          <Card className="auth__card shadow-lg mb-4">
            <Card.Body className="p-4 p-md-5">
              <h2 className="auth__title mb-4">Reset Password</h2>
              <p className="text-center text-muted mb-4">
                Enter your email, the reset token you received, and your new
                password.
              </p>
              <ResetPasswordForm email={email} token={token} />
            </Card.Body>
          </Card>
          <AuthFooterCard />
        </div>
      </Container>
    </section>
  );
}
