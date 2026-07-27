import { Link } from "@tanstack/react-router";

export default function Header() {
  return (
    <header className="header">
      <div className="container">
        <div className="header__wrap">
          <nav className="header__navbar navbar navbar-expand-lg">
            <Link className="header__logo navbar-brand" to="/">
              ChromaArt
            </Link>
            <div className="social-media order-lg-last">
              <p className="mb-0 d-flex">
                <a
                  href="#"
                  className="d-flex align-items-center justify-content-center"
                >
                  <span className="fa fa-facebook">
                    <i className="sr-only">Facebook</i>
                  </span>
                </a>
                <a
                  href="#"
                  className="d-flex align-items-center justify-content-center"
                >
                  <span className="fa fa-twitter">
                    <i className="sr-only">Twitter</i>
                  </span>
                </a>
                <a
                  href="#"
                  className="d-flex align-items-center justify-content-center"
                >
                  <span className="fa fa-instagram">
                    <i className="sr-only">Instagram</i>
                  </span>
                </a>
                <a
                  href="#"
                  className="d-flex align-items-center justify-content-center"
                >
                  <span className="fa fa-dribbble">
                    <i className="sr-only">Dribbble</i>
                  </span>
                </a>
              </p>
            </div>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#main-nav"
              aria-controls="main-nav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="fa fa-bars"></span> Menu
            </button>
            <div className="collapse navbar-collapse" id="main-nav">
              <ul className="navbar-nav ml-auto mr-md-3">
                <li className="nav-item active">
                  <Link className="nav-link" to="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item active">
                  <a className="nav-link" href="#gallery">
                    Gallery
                  </a>
                </li>
                <li className="nav-item active">
                  <a className="nav-link" href="#pricing">
                    Pricing
                  </a>
                </li>
                <li className="nav-item active">
                  <a className="nav-link" href="#policy">
                    TOS
                  </a>
                </li>
                <li className="nav-item active">
                  <a className="nav-link" href="#contact">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
