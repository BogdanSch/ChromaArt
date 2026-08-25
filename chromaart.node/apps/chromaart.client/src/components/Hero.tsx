import { Button, Card, Container } from "react-bootstrap";
import { STUDIO_NAME } from "shared/variables";
import "./hero.scss";

export default function Hero() {
  return (
    <section className="hero mt-5" id="hero">
      <Container>
        <div className="hero__wrap">
          <Card className="hero__card text-center" body>
            <h1 className="hero__title">
              Welcome to {STUDIO_NAME}'s Art Studio
            </h1>
            <p className="hero__subtitle">
              Vibrant Character Design, Anthro Art, and Custom Commissions
            </p>
            <Button
              href="#pricing"
              className="hero__cta-button"
              variant="primary"
            >
              Read more
              <i className="bi bi-search ms-1 ms-md-2"></i>
            </Button>
          </Card>
        </div>
      </Container>
    </section>
  );
}
