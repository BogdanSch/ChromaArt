import { createFileRoute } from "@tanstack/react-router";
import {
  ArtGallery,
  ContactsList,
  PolicySwiper,
  PricingSelector,
} from "../containers";
import { Button, Card } from "react-bootstrap";
import { STUDIO_NAME } from "@/variables";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <>
      <section className="hero mt-5" id="hero">
        <div className="container">
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
            <PolicySwiper />
          </div>
        </div>
      </section>
      <section className="contact" id="contact">
        <div className="container">
          <div className="contact__wrap">
            <div className="text-center">
              <h2 className="contact__title">Get in Touch</h2>
              <p className="contact__text">
                Ready to commission a piece, or have a question about my work?
                Reach out directly through any of the channels below.
              </p>
            </div>
            <ContactsList />
          </div>
        </div>
      </section>
    </>
  );
}
