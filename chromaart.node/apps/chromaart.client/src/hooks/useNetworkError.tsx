import axios from "axios";
import { useState, type JSX } from "react";
import { Alert } from "react-bootstrap";

export function useNetworkError(defaultMessage: string) {
  const [error, setError] = useState<string | null>(null);

  const handleErrorOutput = (error: unknown) => {
    let errorMessage: string = defaultMessage;
    if (axios.isAxiosError(error) && error.response && error.response.data) {
      errorMessage = error.response.data;
    }
    setError(errorMessage);
    console.error(errorMessage, error);
  };

  const resetError = () => {
    setError(null);
  };

  const alert: JSX.Element = (
    <Alert role="alert" variant="danger" show={!!error}>
      {error}
    </Alert>
  );
  return { alert, handleErrorOutput, resetError };
}
