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
          <ul className="footer-navigation__list">
            <li className="footer-navigation__item">
              <Link to="/travel" className="footer-navigation__link">
                Travel
              </Link>
            </li>
            <li className="footer-navigation__item">
              <Link to="/health" className="footer-navigation__link">
                Health
              </Link>
            </li>
            <li className="footer-navigation__item">
              <Link to="/food" className="footer-navigation__link">
                Food
              </Link>
            </li>
            <li className="footer-navigation__item">
              <Link to="/fitness" className="footer-navigation__link">
                Fitness
              </Link>
            </li>
          </ul>
        </nav>
        <nav className="footer-navigation">
          <ul className="footer-navigation__list">
            <li className="footer-navigation__item">
              <Link to="/" className="footer-navigation__link">
                Home
              </Link>
            </li>
            <li className="footer-navigation__item">
              <Link to="/blog/" className="footer-navigation__link">
                Blog
              </Link>
            </li>
            <li className="footer-navigation__item">
              <Link to="/about/" className="footer-navigation__link">
                About
              </Link>
            </li>
            <li className="footer-navigation__item">
              <Link to="/contact/" className="footer-navigation__link">
                Contact
              </Link>
            </li>
          </ul>
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
