import React from "react";
import { Link } from "gatsby";
import cn from "classnames";
import Img from "gatsby-image";

import { SOCIAL_LINKS } from "../constants";
import { slugify } from "../shared/slugify";

const Aside = ({ categories, recentArticles }) => {
  return (
    <aside className="aside">
      <ul className="aside-categories">
        <li className="aside-categories__title">Gategories</li>
        {categories.map(({ label, count }) => (
          <li className="aside-categories__item" key={label}>
            <Link
              to={`/category/${slugify(label)}/`}
              className="aside-categories__link"
            >
              {label}
              <span>{count}</span>
            </Link>
          </li>
        ))}
      </ul>
      <ul className="aside-recent-post">
        <li className="aside-recent-post__title">Recent post</li>
        {recentArticles.nodes.map(
          ({ id, title, URL, publishDate, author, image }) => (
            <li key={id} className="aside-recent-post__item">
              <Link to={`/blog/${URL}/`}>
                <Img
                  fluid={image.localFile.childImageSharp.fluid}
                  alt={title}
                />
              </Link>
              <div>
                <Link to={`/blog/${URL}/`} className="aside-recent-post__link">
                  {title}
                </Link>
                <p className="aside-recent-post__date-author">
                  {publishDate}
                  <span>by</span>
                  {author.fullName}
                </p>
              </div>
            </li>
          )
        )}
      </ul>
      <div className="aside-follow-us">
        {SOCIAL_LINKS.map(({ name, icon, link }) => (
          <a
            key={name}
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "aside-follow-us__item",
              `aside-follow-us__item--${name.toLowerCase()}`
            )}
          >
            <i className={icon} />
          </a>
        ))}
      </div>
      <div className="aside-subscribe">
        <form className="aside-subscribe__form">
          <input type="email" className="aside-subscribe__input" />
          <button className="aside-subscribe__submit-button">Subscribe</button>
        </form>
      </div>
    </aside>
  );
};

export default Aside;
