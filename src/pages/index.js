import React, { Fragment } from "react";
import { Link, graphql } from "gatsby";
import Img from "gatsby-image";

import SEO from "../components/Seo";
import Slider from "components/Slider";

const IndexPage = ({ data }) => {
  const { sliderArticles, recentArticles } = data;
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
          <h2>Sign up for Newsletters!</h2>
          <h3>
            Receive weekly updates and early access to content so that you never
            miss out!
          </h3>
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
  }
`;
