import { createFileRoute, Link } from "@tanstack/react-router";
import { useAuth } from "jwt-react/context/AuthContext";
import { Row, Col, Card } from "react-bootstrap";
import { STUDIO_NAME } from "shared/variables";

export const Route = createFileRoute("/dashboard/")({
  component: AdminDashboard,
});

function AdminDashboard() {
  const { user } = useAuth();
  return (
    <div className="admin-page">
      <div className="admin-page__header">
        <h1 className="admin-page__title">Welcome back, {user?.userName}!</h1>
        <p className="admin-page__subtitle">
          Here is an overview of {STUDIO_NAME}'s status.
        </p>
      </div>
      <Row className="g-4">
        <Col md={4}>
          <Card className="admin-card">
            <Card.Body>
              <Card.Title className="admin-card__title">
                Active Art Categories
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
              <h2 className="admin-card__stat text-primary">3</h2>
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
                Comissions Status
              </Card.Title>
              <h2 className="admin-card__stat text-success">Open</h2>
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
