import { Link } from "@tanstack/react-router";
import { Card, Container } from "react-bootstrap";
import { STUDIO_NAME } from "shared/variables";
import "./simple-header.scss";

type SimpleHeaderProps = {
  sticky?: boolean;
};

export function SimpleHeader({ sticky }: SimpleHeaderProps) {
  return (
    <header
      className={`simple-header mb-4 ${sticky ? "simple-header--sticky" : ""}`}
    >
      <Container fluid className="simple-header__container">
        <div className="simple-header__wrap">
          <Card className="simple-header__card">
            <Card.Body>
              <Link to="/" className="simple-header__logo">
                {STUDIO_NAME}'s Studio
              </Link>
            </Card.Body>
          </Card>
        </div>
      </Container>
    </header>
  );
}
