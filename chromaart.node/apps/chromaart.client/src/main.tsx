import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { SocialsProvider } from "@/contexts/SocialsContext.tsx";
import {
  RouterProvider,
  createRouter,
  type AnyRouter,
} from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { routeTree } from "./routeTree.gen";
import { AuthProvider, useAuth } from "jwt-react/context/AuthContext";
import "./includes.ts";

const queryClient: QueryClient = new QueryClient();
const router: AnyRouter = createRouter({
  routeTree,
  defaultPreload: "intent",
  scrollRestoration: true,
  context: {
    auth: undefined!,
  },
});
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

function InnerApp() {
  const auth = useAuth();
  return <RouterProvider router={router} context={{ auth }} />;
}

const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <SocialsProvider>
            <InnerApp />
          </SocialsProvider>
        </AuthProvider>
      </QueryClientProvider>
    </StrictMode>,
  );
}
