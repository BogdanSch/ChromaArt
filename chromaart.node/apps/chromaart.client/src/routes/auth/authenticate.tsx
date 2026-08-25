import { useEffect, useState } from "react";
import { createFileRoute, Navigate } from "@tanstack/react-router";
import { useAuth } from "jwt-react/context/AuthContext";
import type { TokenDataDto } from "jwt-react/types";

export const Route = createFileRoute("/auth/authenticate")({
  validateSearch: (search: Record<string, unknown>): TokenDataDto => {
    return {
      accessTokenExpirationTime:
        decodeURIComponent(search.accessTokenExpirationTime as string) || "",
      refreshTokenExpirationTime:
        decodeURIComponent(search.refreshTokenExpirationTime as string) || "",
    };
  },
  component: Authenticate,
});

type AuthComplete = "pending" | "success" | "fail";

function Authenticate() {
  const { accessTokenExpirationTime, refreshTokenExpirationTime } =
    Route.useSearch();
  const { authenticateUser, user } = useAuth();

  const [status, setStatus] = useState<AuthComplete>("pending");

  useEffect(() => {
    if (!accessTokenExpirationTime || !refreshTokenExpirationTime) {
      setStatus("fail");
      return;
    }

    authenticateUser({
      accessTokenExpirationTime,
      refreshTokenExpirationTime,
    })
      .then(() => {
        setStatus("success");
        console.log("Successfully loaded user: ", user);
      })
      .catch(() => setStatus("fail"));
  }, [accessTokenExpirationTime, refreshTokenExpirationTime, authenticateUser]);

  if (status === "success") {
    return <Navigate to="/dashboard" />;
  }
  if (status === "fail") {
    return <Navigate to="/auth/login" />;
  }
  return <p>Authenticating...</p>;
}
