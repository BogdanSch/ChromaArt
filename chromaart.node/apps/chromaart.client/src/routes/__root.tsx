import type { ReactNode } from "react";
import {
  createRootRouteWithContext,
  useLocation,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import type { AuthContextProps } from "jwt-react/context/AuthContext";
import { AuthLayout, RegularLayout, DashboardLayout } from "./_layouts";

export interface IRouterContext {
  auth: AuthContextProps;
}
export const Route = createRootRouteWithContext<IRouterContext>()({
  component: RootComponent,
});

function RootComponent() {
  const location = useLocation();
  const pathname = location.pathname;

  let targetLayout: ReactNode;
  if (pathname.startsWith("/dashboard")) {
    targetLayout = <DashboardLayout />;
  } else if (pathname.startsWith("/auth")) {
    targetLayout = <AuthLayout />;
  } else {
    targetLayout = <RegularLayout />;
  }

  return (
    <>
      {targetLayout}
      <TanStackRouterDevtools />
    </>
  );
}
