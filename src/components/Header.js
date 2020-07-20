import React, { useState, useEffect } from "react";
import cn from "classnames";
import { Link } from "gatsby";

const Header = () => {
  const [isScrollDown, setIsScrollDown] = useState(false);

  useEffect(() => {
    const scrollHandler = () => {
      setIsScrollDown(window.pageYOffset > 10);
    };

    window.addEventListener("scroll", scrollHandler);

    return () => {
      window.removeEventListener("scroll", scrollHandler);
    };
  }, [isScrollDown]);

  return (
    <header className={cn("header", { "header--is-narrowed": isScrollDown })}>
      <div className="header__wrapper">
        <Link to="/" className="logo">
          <span>Life</span>
          <span>Style</span>
        </Link>
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
};

export default Header;
