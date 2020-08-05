import React, { Fragment, useState } from "react";
import { Link, graphql } from "gatsby";
import Img from "gatsby-image";
import cn from "classnames";

import SEO from "../components/Seo";
import Slider from "components/Slider";
import Article from "components/Article";
import Dialog from "components/Dialog";
import { SOCIAL_LINKS, EMAIL_REGEX } from "../constants";

const IndexPage = ({ data }) => {
  const { sliderArticles, recentArticles, recommendedArticles } = data;
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

      const timer = Math.ceil(Math.random() * 3);
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
              <Link key={id} to={`/blog/${URL}/`} className="recent-article">
                <p className="recent-article__categories">{category}</p>
                <Img
                  fluid={image.localFile.childImageSharp.fluid}
                  alt={title}
                />
                <div className="recent-article__content">
                  <h3 className="recent-article__title">{title}</h3>
                  <p className="recent-article__date">{publishDate}</p>
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
            <input
              type="email"
              className={cn("subscribes__input", {
                "subscribes__input--error": emailInputError,
              })}
              value={emailInputValue}
              onChange={event => onInputChange(event.target.value)}
            />
            <button
              className="subscribes__submit-button"
              onClick={submitForm}
              disabled={isLoading}
            >
              Submit
            </button>
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
              <Article
                key={id}
                URL={URL}
                title={title}
                image={image}
                category={category}
                size="small"
                shortDescription={shortDescription}
              />
            )
          )}
        </div>
      </section>
      <Dialog isOpen={isDialogOpen} onCloseClick={() => setIsDialogOpen(false)}>
        <i className="icon-paper-plane" />
        <div>Now you subscribed for the latest news from our blog</div>
        <div>Don't forget to check your email</div>
      </Dialog>
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
                maxHeight: 400
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
