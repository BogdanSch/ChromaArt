import axios from "axios";
import { useState } from "react";
import { redirect } from "@tanstack/react-router";
import { useCustomForm } from "shared/hooks";
import { Alert, Button, Form } from "react-bootstrap";
import type { LoginDto } from "@/types";
import { API_URL } from "shared/variables";
import type { TokenDataDto } from "jwt-react/types";
import "@/utils/stringHelper";

const getDefaultData = (): LoginDto => ({
  email: "",
  password: "",
  rememberMe: false,
});

export default function LoginForm() {
  const [formData, setFormData] = useState<LoginDto>(getDefaultData());
  const [requestError, setRequestError] = useState<string | null>();
  const { handleChange } = useCustomForm(setFormData);

  const onSubmit = async (): Promise<void> => {
    try {
      const { data } = await axios.post<TokenDataDto>(
        `${API_URL}/account/login`,
        formData,
      );
      redirect({
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
      let message: string = "Error, couldn't sign in. Please try again later.";
      if (axios.isAxiosError(e) && e.response && e.response.data) {
        message = e.response.data.message;
      }
      console.error(message, e);
    }
  };
  const onReset = () => {
    setRequestError(null);
    setFormData(getDefaultData());
  };

  return (
    <>
      {requestError?.isNullOrWhitespace() && (
        <Alert variant="danger">{requestError}</Alert>
      )}
      <Form onSubmit={onSubmit} onReset={onReset}>
        <Form.Group className="mb-4" controlId="loginEmail">
          <Form.Label htmlFor="email">Email address:</Form.Label>
          <Form.Control
            name="email"
            id="email"
            type="email"
            placeholder="Enter your email"
            className="auth-input"
            onChange={handleChange}
            autoComplete="email"
            value={formData.email}
            required
          />
        </Form.Group>
        <Form.Group className="mb-4" controlId="loginPassword">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            name="password"
            id="password"
            type="password"
            placeholder="Enter your password"
            className="auth-input"
            onChange={handleChange}
            value={formData.password}
            autoComplete="current-password"
            required
          />
        </Form.Group>
        <Form.Group className="mb-4" controlId="loginRemember">
          <Form.Check
            name="rememberMe"
            id="rememberMe"
            type="checkbox"
            label="Remember me"
            className="auth__checkbox"
            onChange={handleChange}
            checked={formData.rememberMe}
          />
        </Form.Group>
        <Form.Group className="form-buttons mt-2">
          <Button variant="primary" type="submit" className="btn-lg auth__btn">
            Log In
          </Button>
          <Button
            variant="outline-danger"
            type="reset"
            className="btn-lg auth__btn"
          >
            Reset
          </Button>
        </Form.Group>
      </Form>
    </>
  );
}
