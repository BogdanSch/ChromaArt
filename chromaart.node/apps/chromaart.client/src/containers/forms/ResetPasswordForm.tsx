import axios from "axios";
import { useState, type SyntheticEvent } from "react";
import { useMutation } from "@tanstack/react-query";
import { Alert, Button, Form } from "react-bootstrap";
import { useCustomForm, useNetworkError } from "@/hooks";
import type { ResetPasswordDto } from "@/types";
import { API_URL } from "shared/variables";

type ResetPasswordFormProps = {
  email: string;
  token: string;
};

const getDefaultData = (email: string, token: string): ResetPasswordDto => ({
  email: email,
  token: token,
  password: "",
  confirmPassword: "",
});

export function ResetPasswordForm({ email, token }: ResetPasswordFormProps) {
  const [formData, setFormData] = useState<ResetPasswordDto>(
    getDefaultData(email, token),
  );
  const { alert, handleErrorOutput, resetError } = useNetworkError(
    "Error, couldn't reset your password.",
  );
  const { isPending, isSuccess, mutate } = useMutation({
    mutationFn: async () => {
      try {
        await axios.post(`${API_URL}/accounts/reset-password`, formData);
      } catch (e) {
        handleErrorOutput(e);
      }
    },
  });
  const { handleChange } = useCustomForm(setFormData);

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    resetError();
    mutate();
  };

  const handleReset = () => {
    resetError();
    setFormData(getDefaultData(email, token));
  };
  return (
    <Form onSubmit={handleSubmit} onReset={handleReset}>
      {alert}
      <Alert variant="success" show={isSuccess && !alert} className="mb-3">
        Your password has been reset successfully. Try logging in with your new
        password.
      </Alert>
      <Form.Group className="mb-3" controlId="resetEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          name="email"
          value={formData.email}
          placeholder="Enter your email"
          className="auth-input"
          disabled
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
      <Form.Group className="form-buttons mt-2">
        <Button
          variant="primary"
          type="submit"
          className="auth__btn"
          disabled={isPending}
        >
          Reset Password <i className="bi bi-lock" />
        </Button>
        <Button variant="outline-light" type="reset" className="auth__btn">
          Clear
        </Button>
      </Form.Group>
    </Form>
  );
}
