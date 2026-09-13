import { Outlet } from "@tanstack/react-router";
import { Col, Row } from "react-bootstrap";
import "./auth.scss";
import { SimpleHeader } from "../partials/SimpleHeader";

export default function AuthLayout() {
  return (
    <>
      <Row className="auth__row">
        <Col xs={12} md={8} lg={6}>
          <SimpleHeader />
          <main className="main">
            <Outlet />
          </main>
        </Col>
      </Row>
    </>
  );
}
