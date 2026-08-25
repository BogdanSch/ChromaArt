import { Row, Col, Card } from "react-bootstrap";
import { createFileRoute, Link } from "@tanstack/react-router";
import { STUDIO_NAME } from "shared/variables";

export const Route = createFileRoute("/dashboard/")({
  component: AdminDashboard,
});

function AdminDashboard() {
  return (
    <div className="admin-page">
      <div className="admin-page__header">
        <h1 className="admin-page__title">Welcome back, ${STUDIO_NAME}!</h1>
        <p className="admin-page__subtitle">
          Here is an overview of your studio's status.
        </p>
      </div>
      <Row className="g-4">
        <Col md={4}>
          <Card className="admin-card">
            <Card.Body>
              <Card.Title className="admin-card__title">
                Active Categories
              </Card.Title>
              <h2 className="admin-card__stat text-primary">4</h2>
              <Link to="/dashboard/pricing" className="admin-card__link">
                Manage Pricing &rarr;
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="admin-card">
            <Card.Body>
              <Card.Title className="admin-card__title">
                Social Links
              </Card.Title>
              <h2 className="admin-card__stat text-primary">2</h2>
              <Link to="/dashboard/socials" className="admin-card__link">
                Manage Socials &rarr;
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="admin-card">
            <Card.Body>
              <Card.Title className="admin-card__title">
                System Status
              </Card.Title>
              <h2 className="admin-card__stat text-success">Online</h2>
              <Link to="/dashboard/settings" className="admin-card__link">
                View Settings &rarr;
              </Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
