import React, { Fragment } from "react";
import { Link, graphql } from "gatsby";
import Img from "gatsby-image";
import cn from "classnames";

import SEO from "components/Seo";
import Paginate from "components/Paginate";
import { SOCIAL_LINKS } from "../constants";

const Blog = ({
  data: { allStrapiArticle, recentArticles },
  pageContext: { pageCount, currentPage },
}) => (
  <Fragment>
    <SEO title="Home" />
    <section className="blog-page-banner">
      <div className="blog-page-banner__wrapper">
        <h1 className="blog-page-banner__title">Our Blog</h1>
        <div className="blog-page-banner__breadcrumbs">
          <Link to="/">Home</Link>
          <span className="slash">/</span>
          <span>Blog</span>
        </div>
      </div>
    </section>
    <section className="blog-page-content">
      <div className="blog-page-content__wrapper">
        <div className="blog-page-content__articles">
          <div className="blog-page-content__articles-list">
            {allStrapiArticle.nodes.map(
              ({ id, Title, Categories, URL, ShortDescription, MediaSet }) => (
                <div key={id} className="article-type">
                  <Link to={`/blog/${URL}/`} className="article-type__image">
                    <Img
                      fluid={MediaSet.SmallImage.childImageSharp.fluid}
                      alt={Title}
                    />
                  </Link>
                  <p className="article-type__categories">{Categories}</p>
                  <Link to={`/blog/${URL}/`} className="article-type__title">
                    <h3>{Title}</h3>
                  </Link>
                  <p className="article-type__description">
                    {ShortDescription}
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
              ({ id, Title, URL, PublishDate, Author, MediaSet }) => (
                <li key={id} className="recent-post__item">
                  <Link to={`/blog/${URL}/`}>
                    <Img
                      fluid={MediaSet.SmallImage.childImageSharp.fluid}
                      alt={Title}
                    />
                  </Link>
                  <div>
                    <Link to={`/blog/${URL}/`} className="recent-post__link">
                      {Title}
                    </Link>
                    <p className="recent-post__date-author">
                      {PublishDate}
                      <span>by</span>
                      {Author.FullName}
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
    allStrapiArticle(
      sort: { fields: PublishDate, order: DESC }
      skip: $skip
      limit: $limit
    ) {
      totalCount
      nodes {
        URL
        Title
        id
        PublishDate(formatString: "DD MMMM YYYY")
        Categories
        ShortDescription
        MediaSet {
          SmallImage {
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
    recentArticles: allStrapiArticle(
      sort: { fields: PublishDate, order: DESC }
      limit: 3
    ) {
      nodes {
        URL
        Title
        id
        PublishDate(formatString: "DD MMMM YYYY")
        Author {
          FullName
        }
        MediaSet {
          SmallImage {
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
