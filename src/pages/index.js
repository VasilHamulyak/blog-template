import React, { Fragment } from "react";
import { Link, graphql } from "gatsby";
import Img from "gatsby-image";
import cn from "classnames";

import SEO from "../components/Seo";
import Slider from "components/Slider";
import { SOCIAL_LINKS } from "../constants";

const IndexPage = ({ data }) => {
  const { sliderArticles, recentArticles, recommendedArticles } = data;
  return (
    <Fragment>
      <SEO title="Home" />
      <section className="banner">
        <div className="banner__wrapper">
          <Slider slideList={sliderArticles.nodes} />
        </div>
      </section>
      <section className="recent-articles">
        <div className="section-title">
          <h2>Recent articles</h2>
        </div>
        <div className="recent-articles__wrapper">
          {recentArticles.nodes.map(
            ({ id, title, category, URL, publishDate, image }) => (
              <Link key={id} to={`/blog/${URL}/`} className="article">
                <p className="article__categories">{category}</p>
                <Img
                  fluid={image.localFile.childImageSharp.fluid}
                  alt={title}
                />
                <div className="article__content">
                  <h3 className="article__title">{title}</h3>
                  <p className="article__date">{publishDate}</p>
                </div>
              </Link>
            )
          )}
        </div>
      </section>
      <section className="subscribes">
        <div className="subscribes__wrapper">
          <h2 className="subscribes__title">Sign up for Newsletters!</h2>
          <h3 className="subscribes__subtitle">
            Receive weekly updates and early access to content so that you never
            miss out!
          </h3>
          <form className="subscribes__form">
            <input type="email" className="subscribes__input" />
            <button className="subscribes__submit-button">Submit</button>
          </form>
          <div className="subscribes__social-networks">
            {SOCIAL_LINKS.map(({ name, icon, link }) => (
              <a
                key={name}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "subscribes__network",
                  `subscribes__network--${name.toLowerCase()}`
                )}
              >
                <i className={icon} />
              </a>
            ))}
          </div>
        </div>
      </section>
      <section className="popular-articles">
        <div className="section-title">
          <h2>Recommended articles</h2>
        </div>
        <div className="popular-articles__wrapper">
          {recommendedArticles.nodes.map(
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
      </section>
    </Fragment>
  );
};

export default IndexPage;

export const data = graphql`
  query {
    sliderArticles: allContentfulArticle(
      filter: { addToHomeSlider: { eq: true } }
    ) {
      nodes {
        URL
        id
        addToHomeSlider
        category
        publishDate(formatString: "DD MMM YYYY")
        title
        image {
          localFile {
            childImageSharp {
              fluid(
                maxWidth: 1200
                maxHeight: 600
                quality: 100
                cropFocus: CENTER
                srcSetBreakpoints: [320, 768, 992, 1200]
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
      limit: 4
    ) {
      nodes {
        URL
        id
        addToHomeSlider
        category
        publishDate(formatString: "DD MMM YYYY")
        title
        image {
          localFile {
            childImageSharp {
              fluid(
                maxWidth: 538
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
    recommendedArticles: allContentfulArticle(
      filter: { recommended: { eq: true } }
      limit: 9
    ) {
      nodes {
        URL
        id
        category
        title
        shortDescription {
          shortDescription
        }
        image {
          localFile {
            childImageSharp {
              fluid(
                maxWidth: 358
                maxHeight: 254
                quality: 100
                cropFocus: CENTER
                srcSetBreakpoints: [320, 358]
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
