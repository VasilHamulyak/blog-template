import React, { Fragment } from "react";
import { Link, graphql } from "gatsby";
import Img from "gatsby-image";
import cn from "classnames";

import SEO from "components/Seo";
import Paginate from "components/Paginate";
import Breadcrumb from "components/Breadcrumb";
import { SOCIAL_LINKS } from "../constants";

const Blog = ({
  data: { allContentfulArticle, recentArticles },
  pageContext: { pageCount, currentPage },
}) => (
  <Fragment>
    <SEO title="Home" />
    <section className="blog-page-banner">
      <div className="blog-page-banner__wrapper">
        <h1 className="blog-page-banner__title">Our Blog</h1>
        <Breadcrumb
          pathArr={[{ path: "/", label: "Home" }]}
          crumbLabel="Blog"
        />
      </div>
    </section>
    <section className="blog-page-content">
      <div className="blog-page-content__wrapper">
        <div className="blog-page-content__articles">
          <div className="blog-page-content__articles-list">
            {allContentfulArticle.nodes.map(
              ({ id, title, category, URL, shortDescription, image }) => (
                <div key={id} className="article-type">
                  <Link to={`/blog/${URL}/`} className="article-type__image">
                    <Img
                      fluid={image.localFile.childImageSharp.fluid}
                      alt={title}
                    />
                  </Link>
                  <p className="article-type__categories">{category}</p>
                  <Link to={`/blog/${URL}/`} className="article-type__title">
                    <h3>{title}</h3>
                  </Link>
                  <p className="article-type__description">
                    {shortDescription.shortDescription}
                  </p>
                </div>
              )
            )}
          </div>
          <Paginate
            pageCount={pageCount}
            linkSuffix="blog"
            currentPage={currentPage}
          />
        </div>
        <aside className="blog-page-content__aside">
          <ul className="categories">
            <li className="categories__title">Gategories</li>
            <li className="categories__item">
              <Link to="/" className="categories__link">
                Travel
              </Link>
            </li>
            <li className="categories__item">
              <Link to="/" className="categories__link">
                Health
              </Link>
            </li>
            <li className="categories__item">
              <Link to="/" className="categories__link">
                Food
              </Link>
            </li>
            <li className="categories__item">
              <Link to="/" className="categories__link">
                Fitness
              </Link>
            </li>
          </ul>
          <ul className="recent-post">
            <li className="recent-post__title">Recent post</li>
            {recentArticles.nodes.map(
              ({ id, title, URL, publishDate, author, image }) => (
                <li key={id} className="recent-post__item">
                  <Link to={`/blog/${URL}/`}>
                    <Img
                      fluid={image.localFile.childImageSharp.fluid}
                      alt={title}
                    />
                  </Link>
                  <div>
                    <Link to={`/blog/${URL}/`} className="recent-post__link">
                      {title}
                    </Link>
                    <p className="recent-post__date-author">
                      {publishDate}
                      <span>by</span>
                      {author.fullName}
                    </p>
                  </div>
                </li>
              )
            )}
          </ul>
          <div className="follow-us">
            {SOCIAL_LINKS.map(({ name, icon, link }) => (
              <a
                key={name}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "follow-us__item",
                  `follow-us__item--${name.toLowerCase()}`
                )}
              >
                <i className={icon} />
              </a>
            ))}
          </div>
          <div className="aside-subscribe">
            <form className="aside-subscribe__form">
              <input type="email" className="aside-subscribe__input" />
              <button className="aside-subscribe__submit-button">
                Subscribe
              </button>
            </form>
          </div>
        </aside>
      </div>
    </section>
  </Fragment>
);

export default Blog;

export const data = graphql`
  query($skip: Int!, $limit: Int!) {
    allContentfulArticle(
      sort: { fields: publishDate, order: DESC }
      skip: $skip
      limit: $limit
    ) {
      nodes {
        URL
        title
        id
        publishDate(formatString: "DD MMMM YYYY")
        category
        shortDescription {
          shortDescription
        }
        image {
          localFile {
            childImageSharp {
              fluid(
                maxWidth: 538
                maxHeight: 380
                quality: 100
                cropFocus: CENTER
                srcSetBreakpoints: [320, 538]
              ) {
                ...GatsbyImageSharpFluid_withWebp_noBase64
              }
            }
          }
        }
      }
    }
    recentArticles: allContentfulArticle(
      sort: { fields: publishDate, order: DESC }
      limit: 3
    ) {
      nodes {
        URL
        title
        id
        publishDate(formatString: "DD MMMM YYYY")
        author {
          fullName
        }
        image {
          localFile {
            childImageSharp {
              fluid(
                maxWidth: 538
                maxHeight: 380
                quality: 100
                cropFocus: CENTER
                srcSetBreakpoints: [320, 538]
              ) {
                ...GatsbyImageSharpFluid_withWebp_noBase64
              }
            }
          }
        }
      }
    }
  }
`;
