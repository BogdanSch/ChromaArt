export default function Index() {
    return <>
    <section className="hero">
  <div className="container">
    <div className="hero__wrap">
      <div className="hero__content">
        <h1 className="hero__title">Welcome to itsnotenderart's Studio</h1>
        <p className="hero__subtitle">Vibrant Character Design, Anthro Art, and Custom Commissions</p>
        <a href="#pricing" className="hero__cta-button">View Commission Status</a>
      </div>
    </div>
  </div>
</section>
<section className="gallery">
  <div className="container">
    <div className="gallery__wrap">
      <h2 className="gallery__title">Recent Works</h2>
      <p className="gallery__description">A live collection of my latest pieces, sketches, and attacks.</p>
      <div className="gallery__grid">
        <article className="gallery__item">
          <img src="/placeholder-art-1.jpg" alt="ArtFight attack 7" className="gallery__image">
          <div className="gallery__overlay">
            <p className="gallery__caption">ArtFight Attack #7!</p>
          </div>
        </article>
        <article className="gallery__item">
          <img src="/placeholder-art-2.jpg" alt="Cat illustration" className="gallery__image">
          <div className="gallery__overlay">
            <p className="gallery__caption">Recent commission</p>
          </div>
        </article>
        <article className="gallery__item">
          <img src="/placeholder-art-3.jpg" alt="Anthro character design" className="gallery__image">
          <div className="gallery__overlay">
            <p className="gallery__caption">Character design concept</p>
          </div>
        </article>
      </div>
      <div className="gallery__actions">
        <a href="https://instagram.com/itsnotenderart" target="_blank" className="gallery__link">View more on Instagram</a>
      </div>
    </div>
  </div>
</section>
<section className="pricing">
  <div className="container">
    <div className="pricing__wrap">
      <h2 className="pricing__title">Commission Prices</h2>
      <p className="pricing__subtitle">Select a category below to view current rates and examples.</p>
      <div className="pricing__tabs">
        <button className="pricing__tab pricing__tab--active">Icons</button>
        <button className="pricing__tab">Half-Body</button>
        <button className="pricing__tab">Full-Body</button>
        <button className="pricing__tab">Ref Sheets</button>
      </div>
      <div className="pricing__content">
        <img src="/path-to-pricing-sheet.jpg" alt="Pricing Sheet Details" className="pricing__image">
      </div>
    </div>
  </div>
</section>
<section className="policy">
  <div className="container">
    <div className="policy__wrap">
      <h2 className="policy__title">Terms of Service</h2>
      <p className="policy__warning">Please read these rules carefully before requesting a commission.</p>
      <div className="policy__content">
        <img src="/path-to-policy-sheet.jpg" alt="Terms of Service and Policies" className="policy__image">
      </div>
    </div>
  </div>
</section>
<section className="contact">
  <div className="container">
    <div className="contact__wrap">
      <h2 className="contact__title">Get in Touch</h2>
      <p className="contact__text">Ready to commission a piece, or have a question about my work? Reach out directly through any of the channels below.</p>
      <div className="contact__links">
        <a href="mailto:artist@example.com" className="contact__link contact__link--email">
          <span className="contact__icon">✉️</span>
          <span className="contact__label">Email Me</span>
        </a>
        <a href="https://instagram.com/itsnotenderart" target="_blank" className="contact__link contact__link--instagram">
          <span className="contact__icon">📷</span>
          <span className="contact__label">Instagram Direct Message</span>
        </a>
        <a href="https://toyhou.se/yourusername" target="_blank" className="contact__link contact__link--toyhouse">
          <span className="contact__icon">🎨</span>
          <span className="contact__label">Toyhouse Profile</span>
        </a>
      </div>
    </div>
  </div>
</section>
  </>;
}