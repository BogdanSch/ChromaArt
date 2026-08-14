import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Table, Button, Modal, Form, Badge, Card } from "react-bootstrap";

export const Route = createFileRoute("/dashboard/pricing")({
  component: AdminPricing,
});

function AdminPricing() {
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleShow = (editMode = false) => {
    setIsEditing(editMode);
    setShowModal(true);
  };
  const handleClose = () => setShowModal(false);

  return (
    <div className="admin-page">
      <div className="admin-page__header d-flex justify-content-between align-items-center">
        <div>
          <h1 className="admin-page__title">Pricing Categories</h1>
          <p className="admin-page__subtitle">
            Manage your commission options and Swiper order.
          </p>
        </div>
        <Button variant="primary" onClick={() => handleShow(false)}>
          <i className="bi bi-plus-lg"></i> Add Category
        </Button>
      </div>
      <Card className="admin-card">
        <Card.Body className="p-0">
          <Table hover responsive className="admin-table mb-0">
            <thead>
              <tr>
                <th>Order</th>
                <th>Name</th>
                <th>Starting Price</th>
                <th>Status</th>
                <th className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* This will eventually be mapped from your useQuery data */}
              <tr>
                <td>1</td>
                <td>
                  <strong>Flat Coloured</strong>
                </td>
                <td>€8.00</td>
                <td>
                  <Badge bg="success">Active</Badge>
                </td>
                <td className="text-end">
                  <Button
                    variant="outline-light"
                    size="sm"
                    className="me-2"
                    onClick={() => handleShow(true)}
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
        onHide={handleClose}
        centered
        contentClassName="admin-modal"
      >
        <Modal.Header closeButton closeVariant="white">
          <Modal.Title>
            {isEditing ? "Edit Category" : "Add New Category"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Category Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="e.g. Fully Shaded"
                className="admin-input"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Starting Price (€)</Form.Label>
              <Form.Control type="number" step="0.01" className="admin-input" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={3} className="admin-input" />
            </Form.Group>
            <Form.Check
              type="switch"
              id="is-active-switch"
              label="Visible on website"
              defaultChecked
            />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-light" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary">Save Changes</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
