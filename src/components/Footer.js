import React from "react";
import cn from "classnames";
import { Link } from "gatsby";

import { SOCIAL_LINKS } from "../constants";

const Footer = () => (
  <footer className="footer">
    <div className="footer__wrapper">
      <div className="footer__top">
        <Link to="/" className="footer-logo">
          <span>Life</span>
          <span>Style</span>
        </Link>
        <nav className="footer-navigation">
          <Link to="/category/travel/" className="footer-navigation__link">
            Travel
          </Link>

          <Link to="/category/health/" className="footer-navigation__link">
            Health
          </Link>

          <Link to="/category/food/" className="footer-navigation__link">
            Food
          </Link>

          <Link to="/category/fitness/" className="footer-navigation__link">
            Fitness
          </Link>
        </nav>
        <nav className="footer-navigation">
          <Link to="/" className="footer-navigation__link">
            Home
          </Link>

          <Link to="/blog/" className="footer-navigation__link">
            Blog
          </Link>

          <Link to="/about/" className="footer-navigation__link">
            About
          </Link>

          <Link to="/contact/" className="footer-navigation__link">
            Contact
          </Link>
        </nav>
      </div>
      <div className="footer__bottom">
        <div className="copyright">
          {`All right reserved © ${new Date().getFullYear()}. Created by Vasyl Khamuliak`}
        </div>
        <div className="social-networks">
          {SOCIAL_LINKS.map(({ name, icon, link }) => (
            <a
              key={name}
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "social-networks__item",
                `social-networks__item--${name.toLowerCase()}`
              )}
            >
              <i className={icon} />
            </a>
          ))}
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
