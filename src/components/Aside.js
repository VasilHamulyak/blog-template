import React, { useState } from "react";
import { Link } from "gatsby";
import cn from "classnames";
import Img from "gatsby-image";

import Dialog from "components/Dialog";
import { SOCIAL_LINKS, EMAIL_REGEX } from "../constants";
import { slugify } from "../shared/slugify";

const Aside = ({ categories, recentArticles }) => {
  const [emailInputValue, setEmailInputValue] = useState("");
  const [emailInputError, setEmailInputError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const onInputChange = value => {
    emailInputError && setEmailInputError(false);
    setEmailInputValue(value);
  };

  const submitForm = event => {
    event.preventDefault();
    if (EMAIL_REGEX.test(emailInputValue)) {
      setIsLoading(true);

      const timer = Math.ceil(Math.random() * 2);
      return new Promise(resolve => {
        setTimeout(() => {
          resolve("Sent");
        }, timer * 1000);
      }).then(_ => {
        setIsDialogOpen(true);
        setEmailInputValue("");
        setIsLoading(false);
      });
    } else {
      setEmailInputError(true);
    }
  };

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
              <span>{label}</span>
              <span>({count})</span>
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
          <input
            type="email"
            className={cn("aside-subscribe__input", {
              "aside-subscribe__input--error": emailInputError,
            })}
            value={emailInputValue}
            onChange={event => onInputChange(event.target.value)}
          />
          <button
            className="aside-subscribe__submit-button"
            onClick={submitForm}
            disabled={isLoading}
          >
            Subscribe
          </button>
        </form>
      </div>
      <Dialog isOpen={isDialogOpen} onCloseClick={() => setIsDialogOpen(false)}>
        <i className="icon-paper-plane" />
        <div>Now you subscribed for the latest news from our blog</div>
        <div>Don't forget to check your email</div>
      </Dialog>
    </aside>
  );
};

export default Aside;
