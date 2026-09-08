import { Outlet } from "@tanstack/react-router";
import { Footer, Header } from "@/components/partials";

export default function RegularLayout() {
  return (
    <>
      <Header />
      <main className="main">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
