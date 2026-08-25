import { Link, Outlet } from "@tanstack/react-router";
import { Button, Container, Nav } from "react-bootstrap";

export default function DashboardLayout() {
  return (
    <>
      <div className="admin-layout">
        <div className="admin-sidebar">
          <div className="admin-sidebar__brand">
            <h2>ChromaArt Admin</h2>
          </div>
          <Nav className="flex-column admin-sidebar__nav">
            <Link
              to="/dashboard"
              className="nav-link"
              activeProps={{ className: "active" }}
            >
              <i className="bi bi-speedometer2"></i> Dashboard
            </Link>
            <Link
              to="/dashboard/pricing"
              className="nav-link"
              activeProps={{ className: "active" }}
            >
              <i className="bi bi-tags"></i> Pricing
            </Link>
            <Link
              to="/dashboard/socials"
              className="nav-link"
              activeProps={{ className: "active" }}
            >
              <i className="bi bi-share"></i> Social Links
            </Link>
            <Link
              to="/dashboard/settings"
              className="nav-link"
              activeProps={{ className: "active" }}
            >
              <i className="bi bi-gear"></i> Site Settings
            </Link>
          </Nav>
          <div className="admin-sidebar__footer">
            <Link to="/" className="btn btn-outline-light w-100 mb-2">
              View Live Site
            </Link>
            <Button variant="danger" className="w-100">
              Logout
            </Button>
          </div>
        </div>
        <div className="admin-content">
          <Container fluid className="py-4">
            <Outlet />
          </Container>
        </div>
      </div>
    </>
  );
}
