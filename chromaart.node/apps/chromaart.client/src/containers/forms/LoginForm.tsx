import axios from "axios";
import { useState, type SyntheticEvent } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { PasswordInput } from "@/components";
import { useNetworkError, useCustomForm } from "@/hooks";
import type { LoginDto } from "@/types";
import type { TokenDataDto } from "jwt-react/types";
import { API_URL } from "shared/variables";
import { Alert, Button, Form } from "react-bootstrap";

const getDefaultData = (): LoginDto => ({
  email: "",
  password: "",
  rememberMe: false,
});

export function LoginForm() {
  const navigate = useNavigate({ from: "/auth/login" });
  const [formData, setFormData] = useState<LoginDto>(getDefaultData());
  const { handleChange } = useCustomForm(setFormData);
  const { validationErrors, handleErrorOutput, resetError } = useNetworkError(
    "Error, couldn't sign in. Please try again later.",
  );
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: async () => {
      try {
        const { data } = await axios.post<TokenDataDto>(
          `${API_URL}/accounts/login`,
          formData,
          {
            withCredentials: true,
          },
        );
        navigate({
          to: "/auth/authenticate",
          search: {
            accessTokenExpirationTime: encodeURIComponent(
              data.accessTokenExpirationTime,
            ),
            refreshTokenExpirationTime: encodeURIComponent(
              data.refreshTokenExpirationTime,
            ),
          },
        });
      } catch (e) {
        handleErrorOutput(e);
      }
    },
  });

  const onSubmit = async (e: SyntheticEvent): Promise<void> => {
    e.preventDefault();
    resetError();
    mutate();
  };

  const onReset = () => {
    resetError();
    setFormData(getDefaultData());
  };

  return (
    <>
      {isError && <Alert variant={"danger"}>{error?.message}</Alert>}
      <Form onSubmit={onSubmit} onReset={onReset}>
        <Form.Group className="mb-4" controlId="email">
          <Form.Label>Email address:</Form.Label>
          <Form.Control
            name="email"
            type="email"
            placeholder="Enter your email"
            className="auth-input"
            onChange={handleChange}
            autoComplete="email"
            value={formData.email}
            required
          />
          <Alert variant="danger" show={!!validationErrors.email}>
            {validationErrors.email}
          </Alert>
        </Form.Group>
        <Form.Group className="mb-4" controlId="password">
          <Form.Label>Password:</Form.Label>
          <PasswordInput value={formData.password} onChange={handleChange} />
          <Form.Text id="passwordHelpInline" muted>
            Your password must be at least 8 characters long, contain letters,
            special characters, and numbers, and must not contain emoji.
          </Form.Text>
          <Alert variant="danger" show={!!validationErrors.password}>
            {validationErrors.password}
          </Alert>
        </Form.Group>
        <Form.Group className="mb-4" controlId="rememberMe">
          <Form.Check
            name="rememberMe"
            type="checkbox"
            label="Remember me"
            className="auth__checkbox"
            onChange={handleChange}
            checked={formData.rememberMe}
          />
        </Form.Group>
        <Form.Group className="form-buttons mt-2">
          <Button
            variant="primary"
            type="submit"
            className="btn-lg auth__btn"
            disabled={isPending}
          >
            {isPending ? "Logging In..." : "Log In"}
          </Button>
          <Button
            variant="outline-danger"
            type="reset"
            className="btn-lg auth__btn"
          >
            Clear
          </Button>
        </Form.Group>
      </Form>
    </>
  );
}
