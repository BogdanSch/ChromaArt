import { Link, Outlet } from "@tanstack/react-router";
import { Container, Nav } from "react-bootstrap";
import { SimpleHeader } from "../partials/SimpleHeader";
import { LogoutButton } from "../buttons/LogoutButton";
import "./dashboard.scss";

export default function DashboardLayout() {
  return (
    <>
      <div className="admin-layout">
        <div className="admin-sidebar">
          <Nav className="flex-column admin-sidebar__nav">
            <Link
              to="/dashboard"
              className="nav-link"
              activeProps={{ className: "active" }}
            >
              <i className="bi bi-speedometer2" /> Dashboard
            </Link>
            <Link
              to="/dashboard/pricing"
              className="nav-link"
              activeProps={{ className: "active" }}
            >
              <i className="bi bi-tags" /> Pricing
            </Link>
            <Link
              to="/dashboard/socials"
              className="nav-link"
              activeProps={{ className: "active" }}
            >
              <i className="bi bi-share" /> Social Links
            </Link>
            <Link
              to="/dashboard/settings"
              className="nav-link"
              activeProps={{ className: "active" }}
            >
              <i className="bi bi-gear" /> Site Settings
            </Link>
          </Nav>
          <div className="admin-sidebar__footer">
            <LogoutButton />
          </div>
        </div>
        <div className="admin-content">
          <SimpleHeader />
          <Container fluid>
            <Outlet />
          </Container>
        </div>
      </div>
    </>
  );
}
