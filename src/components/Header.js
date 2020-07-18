import React from "react";
import { Link } from "gatsby";

const Header = () => (
  <header className="header">
    <div className="header__wrapper">
      <div className="logo">
        <span>Life</span>
        <span>Style</span>
      </div>
      <nav className="navigation">
        <ul className="navigation__list">
          <li className="navigation__item">
            <Link
              to="/"
              className="navigation__link"
              activeClassName="navigation__link--is-active"
            >
              Home
            </Link>
          </li>
          <li className="navigation__item">
            <Link
              to="/blog/"
              partiallyActive
              className="navigation__link"
              activeClassName="navigation__link--is-active"
            >
              Blog
            </Link>
          </li>
          <li className="navigation__item">
            <Link
              to="/about/"
              className="navigation__link"
              activeClassName="navigation__link--is-active"
            >
              About
            </Link>
          </li>
          <li className="navigation__item">
            <Link
              to="/contact/"
              className="navigation__link"
              activeClassName="navigation__link--is-active"
            >
              Contact
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  </header>
);

export default Header;
