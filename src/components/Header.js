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
          <li className="navigation__item navigation__item--is-active">
            <Link to="/" className="navigation__link">
              Home
            </Link>
          </li>
          <li className="navigation__item">
            <Link to="/blog" className="navigation__link">
              Blog
            </Link>
          </li>
          <li className="navigation__item">
            <Link to="/about" className="navigation__link">
              About
            </Link>
          </li>
          <li className="navigation__item">
            <Link to="/contact" className="navigation__link">
              Contact
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  </header>
);

export default Header;
