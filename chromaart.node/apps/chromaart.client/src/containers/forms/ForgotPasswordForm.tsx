import axios from "axios";
import { useState, type SyntheticEvent } from "react";
import { useMutation } from "@tanstack/react-query";
import { Alert, Button, Form } from "react-bootstrap";
import { useCustomForm, useNetworkError } from "@/hooks";
import type { ForgotPasswordDto } from "@/types";
import { API_URL } from "shared/variables";

const getDefaultData = (): ForgotPasswordDto => ({
  email: "",
  clientUri: `${window.location.origin}/auth/reset-password`,
});

export function ForgotPasswordForm() {
  const [formData, setFormData] = useState<ForgotPasswordDto>(getDefaultData());
  const { validationErrors, handleErrorOutput, resetError } = useNetworkError(
    "Error, couldn't send the password reset link.",
  );
  const { isPending, isSuccess, mutate, isError, error } = useMutation({
    mutationFn: async () => {
      try {
        await axios.post(`${API_URL}/accounts/forgot-password`, formData);
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
    setFormData(getDefaultData());
  };

  return (
    <Form onSubmit={handleSubmit} onReset={handleReset}>
      {isError && <Alert variant={"danger"}>{error?.message}</Alert>}
      <Alert variant="success" show={isSuccess && !alert} className="mb-4">
        If an account with that email exists, we have sent a password reset link
        to your email. Please check your inbox or spam folder.
      </Alert>
      <Form.Group className="mb-4" controlId="email">
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
        <Alert variant="danger" show={!!validationErrors.email}>
          {validationErrors.email}
        </Alert>
      </Form.Group>
      <Form.Group className="form-buttons mt-2">
        <Button
          variant="primary"
          type="submit"
          className="btn-lg auth__btn"
          disabled={isPending}
        >
          {isPending ? "Sending..." : "Send Reset Link"}
        </Button>
        <Button
          variant="outline-light"
          type="reset"
          className="btn-lg auth__btn"
        >
          Clear
        </Button>
      </Form.Group>
    </Form>
  );
}
