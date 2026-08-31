import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Container, Card, Form, Button } from "react-bootstrap";
import { useCustomForm } from "shared/hooks";
import type { ResetPasswordDto } from "@/types";

export const Route = createFileRoute("/auth/reset-password")({
  component: ResetPassword,
});

const getDefaultData = (): ResetPasswordDto => ({
  email: "",
  token: "",
  password: "",
  confirmPassword: "",
});

function ResetPassword() {
  const [formData, setFormData] = useState<ResetPasswordDto>(getDefaultData());
  const { handleChange } = useCustomForm(setFormData);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // TODO: Wire up to your axios instance and TanStack mutation
    console.log("Payload ready for backend:", formData);
  };

  const handleReset = () => {
    setFormData(getDefaultData());
  };

  return (
    <section className="auth-section">
      <Container>
        <div className="auth__wrap">
          <Card className="auth__card shadow-lg">
            <Card.Body className="p-4 p-md-5">
              <h2 className="auth__title text-center mb-4">Reset Password</h2>
              <p className="text-center text-muted mb-4">
                Enter your email, the reset token you received, and your new
                password.
              </p>

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="resetEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="auth-input"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="resetToken">
                  <Form.Label>Reset Token</Form.Label>
                  <Form.Control
                    type="text"
                    name="token"
                    value={formData.token}
                    onChange={handleChange}
                    placeholder="Paste your reset token here"
                    className="auth-input"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="resetPassword">
                  <Form.Label>New Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter new password"
                    className="auth-input"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-4" controlId="resetConfirmPassword">
                  <Form.Label>Confirm New Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm new password"
                    className="auth-input"
                    required
                  />
                </Form.Group>

                <div className="d-flex gap-2">
                  <Button
                    variant="outline-light"
                    type="button"
                    className="w-50 auth__btn"
                    onClick={handleReset}
                  >
                    Clear Form
                  </Button>
                  <Button
                    variant="primary"
                    type="submit"
                    className="w-50 auth__btn"
                  >
                    Reset Password
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>

          <div className="text-center mt-4">
            <p className="auth__footer-text">
              Remember your password?{" "}
              <Link to="/auth/login" className="auth__link">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
