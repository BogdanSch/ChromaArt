import { useState } from "react";
import { Link, Outlet } from "@tanstack/react-router";
import { BrandHeader } from "../partials/BrandHeader";
import { LogoutButton } from "../buttons/LogoutButton";
import { Container, Nav, Offcanvas } from "react-bootstrap";
import "./dashboard.scss";
import "./dashboard-page.scss";

export default function DashboardLayout() {
  const [showSidebar, setShowSidebar] = useState(false);

  const handleClose = () => setShowSidebar(false);
  const handleShow = () => setShowSidebar(true);

  return (
    <>
      <div className="dashboard-layout">
        <Offcanvas
          show={showSidebar}
          onHide={handleClose}
          responsive="lg"
          className="dashboard-sidebar"
          placement="start"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Dashboard navigation</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body className="dashboard-sidebar__body">
            <Nav className="dashboard-sidebar__nav">
              <Link
                to="/dashboard/"
                className="nav-link"
                activeProps={{ className: "active" }}
                activeOptions={{ exact: true }}
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
            <div className="dashboard-sidebar__footer">
              <LogoutButton />
            </div>
          </Offcanvas.Body>
        </Offcanvas>
        <div className="dashboard-content">
          <BrandHeader handleShow={handleShow} sticky />
          <Container fluid>
            <Outlet />
          </Container>
        </div>
      </div>
    </>
  );
}
