import axios from "axios";
import { useState } from "react";

export function useNetworkError(defaultMessage: string) {
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});

  const handleErrorOutput = (error: unknown): void => {
    let errorMessage: string = defaultMessage;

    if (axios.isAxiosError(error)) {
      if (error.response?.data.errors) {
        setValidationErrors(error.response.data.errors);
        return;
      } else if (error.response?.data.detail) {
        errorMessage = error.response.data.detail;
      }
    }
    console.error(errorMessage, error);
    throw new Error(errorMessage);
  };

  const resetError = () => {
    setValidationErrors({});
  };

  return { handleErrorOutput, resetError, validationErrors };
}
