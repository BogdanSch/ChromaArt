import { Outlet } from "@tanstack/react-router";
import { Col, Row } from "react-bootstrap";
import "./auth.scss";
import { BrandHeader } from "../partials/BrandHeader";

export default function AuthLayout() {
  return (
    <>
      <Row className="auth__row">
        <Col xs={12} md={8} lg={6}>
          <BrandHeader />
          <main className="main">
            <Outlet />
          </main>
        </Col>
      </Row>
    </>
  );
}
