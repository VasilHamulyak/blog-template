import React from "react";
import cn from "classnames";
import { Link } from "gatsby";

const Drawer = ({ isDrawerOpen, onDrawerClick }) => (
  <div className={cn("drawer", { "drawer--is-open": isDrawerOpen })}>
    <Link to="/" className="logo drawer__logo" onClick={onDrawerClick}>
      <span>Life</span>
      <span>Style</span>
    </Link>
    <nav className="drawer__nav">
      <Link
        to="/"
        onClick={onDrawerClick}
        className="drawer__link"
        activeClassName="drawer__link--is-active"
      >
        Home
      </Link>
      <Link
        to="/blog/"
        onClick={onDrawerClick}
        partiallyActive
        className="drawer__link"
        activeClassName="drawer__link--is-active"
      >
        Blog
      </Link>
      <Link
        to="/about/"
        onClick={onDrawerClick}
        className="drawer__link"
        activeClassName="drawer__link--is-active"
      >
        About
      </Link>
      <Link
        to="/contact/"
        onClick={onDrawerClick}
        className="drawer__link"
        activeClassName="drawer__link--is-active"
      >
        Contact
      </Link>
    </nav>
  </div>
);

export default Drawer;
