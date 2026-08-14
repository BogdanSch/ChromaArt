import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Table, Button, Modal, Form, Card } from "react-bootstrap";

export const Route = createFileRoute("/dashboard/socials")({
  component: AdminSocials,
});

export default function AdminSocials() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="admin-page">
      <div className="admin-page__header d-flex justify-content-between align-items-center">
        <div>
          <h1 className="admin-page__title">Social Links</h1>
          <p className="admin-page__subtitle">
            Update the social media icons on your footer and navbar.
          </p>
        </div>
        <Button variant="primary" onClick={() => setShowModal(true)}>
          <i className="bi bi-plus-lg"></i> Add Social Link
        </Button>
      </div>
      <Card className="admin-card">
        <Card.Body className="p-0">
          <Table hover responsive className="admin-table mb-0">
            <thead>
              <tr>
                <th>Platform</th>
                <th>URL</th>
                <th className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <i className="bi bi-instagram me-2"></i> Instagram
                </td>
                <td className="text-muted">
                  https://instagram.com/itsnotenderart
                </td>
                <td className="text-end">
                  <Button
                    variant="outline-light"
                    size="sm"
                    className="me-2"
                    onClick={() => setShowModal(true)}
                  >
                    <i className="bi bi-pencil"></i>
                  </Button>
                  <Button variant="outline-danger" size="sm">
                    <i className="bi bi-trash"></i>
                  </Button>
                </td>
              </tr>
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
        contentClassName="admin-modal"
      >
        <Modal.Header closeButton closeVariant="white">
          <Modal.Title>Manage Social Link</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Platform Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="e.g. Twitter"
                className="admin-input"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Profile URL</Form.Label>
              <Form.Control
                type="url"
                placeholder="https://"
                className="admin-input"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-light" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary">Save Changes</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
