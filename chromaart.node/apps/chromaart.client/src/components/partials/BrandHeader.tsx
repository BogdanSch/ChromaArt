import { Link } from "@tanstack/react-router";
import { Button, Card, Container } from "react-bootstrap";
import { STUDIO_NAME } from "shared/variables";
import "./brand-header.scss";

type BrandHeaderProps = {
  sticky?: boolean;
  handleShow?: () => void;
};

export function BrandHeader({ sticky, handleShow }: BrandHeaderProps) {
  return (
    <header
      className={`brand-header mb-4 ${sticky ? "brand-header--sticky" : ""}`}
    >
      <Container fluid className="brand-header__container">
        <div className="brand-header__wrap">
          <Card className="brand-header__card">
            <Card.Body>
              <Link to="/" className="brand-header__logo">
                {STUDIO_NAME}'s Studio
              </Link>
              {handleShow && (
                <div className="d-lg-none">
                  <Button
                    variant="outline-light"
                    onClick={handleShow}
                    className="d-flex align-items-center gap-2 border-secondary"
                  >
                    <i className="bi bi-list fs-4" /> <span>Menu</span>
                  </Button>
                </div>
              )}
            </Card.Body>
          </Card>
        </div>
      </Container>
    </header>
  );
}
