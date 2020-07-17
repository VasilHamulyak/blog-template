import React, { Fragment } from "react";
import { Link, graphql } from "gatsby";
import Img from "gatsby-image";
import cn from "classnames";

import SEO from "../components/Seo";
import Slider from "components/Slider";

const SOCIAL_LINKS = [
  {
    name: "Linkedin",
    icon: "icon-linkedin",
    link: "https://linkedin.com",
  },
  {
    name: "YouTube",
    icon: "icon-youtube-play",
    link: "https://youtube.com",
  },
  {
    name: "Facebook",
    icon: "icon-facebook",
    link: "https://facebook.com",
  },
  {
    name: "Twitter",
    icon: "icon-twitter",
    link: "https://twitter.com",
  },
  {
    name: "Instagram",
    icon: "icon-instagram",
    link: "https://instagram.com",
  },
];

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
            ({ id, Title, Categories, URL, PublishDate, MediaSet }) => (
              <Link key={id} to={`/blog/${URL}/`} className="article">
                <p className="article__categories">{Categories}</p>
                <Img
                  fluid={MediaSet.SmallImage.childImageSharp.fluid}
                  alt={Title}
                />
                <div className="article__content">
                  <h3 className="article__title">{Title}</h3>
                  <p className="article__date">{PublishDate}</p>
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
                <p className="article-type__description">{ShortDescription}</p>
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
    sliderArticles: allStrapiArticle(
      filter: { AddToHomeSlider: { eq: true } }
    ) {
      nodes {
        URL
        Title
        id
        PublishDate(formatString: "DD MMM YYYY")
        Categories
        MediaSet {
          MainImage {
            childImageSharp {
              fluid(
                maxWidth: 1200
                maxHeight: 600
                quality: 100
                srcSetBreakpoints: [320, 768, 992, 1200]
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
      limit: 4
    ) {
      nodes {
        URL
        Title
        id
        PublishDate(formatString: "DD MMMM YYYY")
        Categories
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
    recommendedArticles: allStrapiArticle(
      filter: { Recommended: { eq: true } }
      limit: 9
    ) {
      nodes {
        URL
        Title
        id
        PublishDate(formatString: "DD MMMM YYYY")
        Categories
        ShortDescription
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
                srcSetBreakpoints: [320, 558]
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
