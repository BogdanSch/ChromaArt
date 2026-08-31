import { Link, Outlet } from "@tanstack/react-router";
import { Card, Col, Row } from "react-bootstrap";
import "./auth.scss";
import { STUDIO_NAME } from "shared/variables";

export default function AuthLayout() {
  return (
    <>
      <Row className="auth__row">
        <Col xs={12} md={8} lg={6}>
          <header className="auth-header mb-4">
            <div className="container">
              <div className="auth-header__wrap">
                <Card className="auth-header__card">
                  <Card.Body>
                    <Link to="/" className="auth-header__logo">
                      {STUDIO_NAME}'s Studio
                    </Link>
                  </Card.Body>
                </Card>
              </div>
            </div>
          </header>
          <main className="main">
            <Outlet />
          </main>
        </Col>
      </Row>
    </>
  );
}
