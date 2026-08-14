import { createFileRoute } from "@tanstack/react-router";
import { Form, Button, Card } from "react-bootstrap";

export const Route = createFileRoute("/dashboard/settings")({
  component: AdminSettings,
});

function AdminSettings() {
  return (
    <div className="admin-page">
      <div className="admin-page__header">
        <h1 className="admin-page__title">Site Settings</h1>
        <p className="admin-page__subtitle">
          Configure global variables and legal texts.
        </p>
      </div>

      <Form>
        <Card className="admin-card mb-4">
          <Card.Header className="admin-card__header">
            Branding & Theming
          </Card.Header>
          <Card.Body>
            <Form.Group className="mb-3">
              <Form.Label>Primary Accent Color (Hex)</Form.Label>
              <Form.Control
                type="text"
                defaultValue="#ff00a0"
                className="admin-input"
              />
              <Form.Text className="text-muted">
                Used for buttons, active tabs, and highlights.
              </Form.Text>
            </Form.Group>
          </Card.Body>
        </Card>

        <Card className="admin-card mb-4">
          <Card.Header className="admin-card__header">
            Legal & Privacy
          </Card.Header>
          <Card.Body>
            <Form.Group className="mb-3">
              <Form.Label>Terms of Service URL</Form.Label>
              <Form.Control
                type="url"
                placeholder="Link to your TOS document"
                className="admin-input"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Privacy Policy Notice</Form.Label>
              <Form.Control as="textarea" rows={3} className="admin-input" />
            </Form.Group>
          </Card.Body>
        </Card>

        <div className="d-flex justify-content-end mb-5">
          <Button variant="primary" size="lg">
            <i className="bi bi-save me-2"></i> Save All Settings
          </Button>
        </div>
      </Form>
    </div>
  );
}
