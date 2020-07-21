import React from "react";
import cn from "classnames";
import { Link } from "gatsby";
import Img from "gatsby-image";

const Article = ({ size, URL, title, image, category, shortDescription }) => (
  <article
    className={cn("article", {
      "article--small": size === "small",
      "article--medium": size === "medium",
    })}
  >
    <Link to={`/blog/${URL}/`} className="article__image">
      <Img fluid={image.localFile.childImageSharp.fluid} alt={title} />
    </Link>
    <p className="article__categories">{category}</p>
    <Link to={`/blog/${URL}/`} className="article__title">
      <h3>{title}</h3>
    </Link>
    <p className="article__description">{shortDescription.shortDescription}</p>
  </article>
);

export default Article;
