import { createFileRoute } from "@tanstack/react-router";
import { ArtGallery, PricingSelector } from "../containers";
import { Button } from "react-bootstrap";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <>
      <section className="hero mt-5" id="hero">
        <div className="container">
          <div className="hero__wrap">
            <h1 className="hero__title">Welcome to itsnotenderart's Studio</h1>
            <p className="hero__subtitle">
              Vibrant Character Design, Anthro Art, and Custom Commissions
            </p>
            <Button
              href="#pricing"
              className="hero__cta-button"
              variant="primary"
            >
              View Commission Status
            </Button>
          </div>
        </div>
      </section>
      <section className="gallery" id="gallery">
        <div className="container">
          <div className="gallery__wrap">
            <div className="mb-4">
              <h2 className="gallery__title">Recent Works</h2>
              <p className="gallery__description">
                A live collection of my latest pieces, sketches, and attacks.
              </p>
            </div>
            <ArtGallery />
          </div>
        </div>
      </section>
      <section className="pricing" id="pricing">
        <div className="container">
          <div className="pricing__wrap">
            <div className="mb-4">
              <h2 className="pricing__title">Commission Prices</h2>
              <p className="pricing__subtitle">
                Select a category below to view current rates and examples.
              </p>
            </div>
            <PricingSelector />
          </div>
        </div>
      </section>
      <section className="policy" id="policy">
        <div className="container">
          <div className="policy__wrap">
            <h2 className="policy__title">Terms of Service</h2>
            <p className="policy__warning">
              Please read these rules carefully before requesting a commission.
            </p>
            <div className="policy__content">
              <img
                src="/path-to-policy-sheet.jpg"
                alt="Terms of Service and Policies"
                className="policy__image"
              />
            </div>
          </div>
        </div>
      </section>
      <section className="contact" id="contact">
        <div className="container">
          <div className="contact__wrap">
            <h2 className="contact__title">Get in Touch</h2>
            <p className="contact__text">
              Ready to commission a piece, or have a question about my work?
              Reach out directly through any of the channels below.
            </p>
            <div className="contact__links">
              <a
                href="mailto:artist@example.com"
                className="contact__link contact__link--email"
              >
                <span className="contact__icon">✉️</span>
                <span className="contact__label">Email Me</span>
              </a>
              <a
                href="https://instagram.com/itsnotenderart"
                target="_blank"
                className="contact__link contact__link--instagram"
              >
                <span className="contact__icon">📷</span>
                <span className="contact__label">Instagram Direct Message</span>
              </a>
              <a
                href="https://toyhou.se/yourusername"
                target="_blank"
                className="contact__link contact__link--toyhouse"
              >
                <span className="contact__icon">🎨</span>
                <span className="contact__label">Toyhouse Profile</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
