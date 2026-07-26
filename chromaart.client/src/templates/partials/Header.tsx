import { Link } from "@tanstack/react-router";
import "./header.scss";

export default function Header() {
  return (
    <header className="header">
      <div className="container">
        <div className="header__wrap">
          <nav
            className="header__navbar navbar navbar-expand-lg ftco-navbar-light"
            id="ftco-navbar"
          >
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
              data-target="#ftco-nav"
              aria-controls="ftco-nav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="fa fa-bars"></span> Menu
            </button>
            <div className="collapse navbar-collapse" id="ftco-nav">
              <ul className="navbar-nav ml-auto mr-md-3">
                <li className="nav-item active">
                  <Link className="nav-link" to="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item active">
                  <Link
                    className="nav-link"
                    to="/$anchor"
                    params={{ anchor: "#gallery" }}
                  >
                    Gallery
                  </Link>
                </li>
                <li className="nav-item active">
                  <Link
                    className="nav-link"
                    to="/$anchor"
                    params={{ anchor: "#pricing" }}
                  >
                    Pricing
                  </Link>
                </li>
                <li className="nav-item active">
                  <Link
                    className="nav-link"
                    to="/$anchor"
                    params={{ anchor: "#policy" }}
                  >
                    TOS
                  </Link>
                </li>
                <li className="nav-item active">
                  <Link
                    className="nav-link"
                    to="/$anchor"
                    params={{ anchor: "#contact" }}
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
