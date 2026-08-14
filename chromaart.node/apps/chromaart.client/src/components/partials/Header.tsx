import { Link, useLocation } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useSocials } from "@/contexts/SocialsContext";
import "@/utils/stringHelper";
import { getIconClass } from "@/utils/iconHelper";
import "./header.scss";

type LandingLink = {
  text: string;
  hash: string;
  isActive: boolean;
};
const getMainNavLinks = (): LandingLink[] => [
  { text: "Home", hash: "", isActive: false },
  { text: "Gallery", hash: "gallery", isActive: false },
  { text: "Pricing", hash: "pricing", isActive: false },
  { text: "TOS", hash: "policy", isActive: false },
  { text: "Contact", hash: "contact", isActive: false },
];

export default function Header() {
  const location = useLocation();

  const [mainNavLinks, setMainNavLinks] =
    useState<LandingLink[]>(getMainNavLinks());

  useEffect(() => {
    const targetHash: string = location.hash.replace("#", "").trim();
    const newMainNavLinks = getMainNavLinks();
    newMainNavLinks.forEach((link) => {
      link.isActive = link.hash === targetHash;
    });
    setMainNavLinks(newMainNavLinks);
  }, [location.hash]);

  const { data, isLoading } = useSocials();

  if (isLoading) return <p>Loading...</p>;
  return (
    <header className="header">
      <div className="container">
        <div className="header__wrap">
          <nav className="header__navbar navbar navbar-expand-lg">
            <Link className="header__logo navbar-brand" to="/">
              ChromaArt
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#main-nav, #auth-nav"
              aria-controls="main-nav"
              aria-expanded="true"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="main-nav">
              <ul className="navbar-nav">
                {mainNavLinks.map((link, index) => {
                  return (
                    <li
                      className={`nav-item${link.isActive ? " active" : ""}`}
                      key={`main-nav-${index}`}
                    >
                      <a
                        className="nav-link"
                        href={`/${!link.hash.isNullOrWhitespace() ? `#${link.hash}` : ""}`}
                      >
                        {link.text}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="social-media">
              <ul className="mb-0 social-media__list">
                {data.map((link, index) => (
                  <li
                    className="social-media__item"
                    key={`header-link-${index}`}
                  >
                    <a
                      href={link.url}
                      target="_blank"
                      className="social-media__link"
                    >
                      <i className={`bi ${getIconClass(link.platformName)}`} />
                      <span className="social-media__hint">
                        <p className="social-media__hint-text">
                          {link.platformName}
                        </p>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="collapse navbar-collapse" id="auth-nav">
              <ul className="auth__navbar navbar-nav">
                <li className="nav-item">
                  <Link className="btn btn-outline-primary" to="/auth/login">
                    Login
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
