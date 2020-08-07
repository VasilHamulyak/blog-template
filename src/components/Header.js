import React, { useState, useEffect } from "react";
import cn from "classnames";
import { Link } from "gatsby";

import Drawer from "./Drawer";
import MenuToggle from "./MenuToggle";
import Backdrop from "./Backdrop";

const Header = () => {
  const [isScrollDown, setIsScrollDown] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

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
          <Link
            to="/"
            className="navigation__link"
            activeClassName="navigation__link--is-active"
          >
            Home
          </Link>
          <Link
            to="/blog/"
            partiallyActive
            className="navigation__link"
            activeClassName="navigation__link--is-active"
          >
            Blog
          </Link>
          <Link
            to="/about/"
            className="navigation__link"
            activeClassName="navigation__link--is-active"
          >
            About
          </Link>
          <Link
            to="/contact/"
            className="navigation__link"
            activeClassName="navigation__link--is-active"
          >
            Contact
          </Link>
        </nav>
      </div>
      <MenuToggle
        isDrawerOpen={isDrawerOpen}
        onToggleClick={() => setIsDrawerOpen(!isDrawerOpen)}
      />
      <Drawer
        isDrawerOpen={isDrawerOpen}
        onDrawerClick={() => setIsDrawerOpen(false)}
      />
      {isDrawerOpen && (
        <Backdrop onBackdropClick={() => setIsDrawerOpen(false)} />
      )}
    </header>
  );
};

export default Header;
