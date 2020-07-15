import React, { Fragment } from "react";
import { graphql } from "gatsby";

import SEO from "../components/Seo";
import Slider from "components/Slider";

const IndexPage = ({ data }) => {
  const { sliderArticles } = data;
  return (
    <Fragment>
      <SEO title="Home" />
      <section className="banner">
        <div className="banner__wrapper">
          <Slider slideList={sliderArticles.nodes} />
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
  }
`;
