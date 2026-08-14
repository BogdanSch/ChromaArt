import { Footer, Header } from "../components/partials";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export const Route = createRootRoute({
  component: () => (
    <>
      <Header />
      <main className="main">
        <Outlet />
      </main>
      <Footer />
      <TanStackRouterDevtools />
    </>
  ),
});
