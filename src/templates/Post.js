import React, { Fragment } from "react";
import { Link, graphql } from "gatsby";
import Img from "gatsby-image";
import ReactMarkdown from "react-markdown";

import SEO from "components/Seo";

function Post({ data }) {
  const {
    Author,
    Title,
    Content,
    Categories,
    PublishDate,
    MediaSet,
  } = data.strapiArticle;

  return (
    <Fragment>
      <SEO title="Home" />
      <section className="post-banner">
        <div className="post-banner__wrapper">
          <h1 className="post-banner__title">{Categories}</h1>
          <div className="post-banner__breadcrumbs">
            <Link to="/">Home</Link>
            <span className="slash">/</span>
            <Link to="/blog/">Blog</Link>
            <span className="slash">/</span>
            <span>{Title}</span>
          </div>
        </div>
      </section>
      <section className="post-image">
        <Img
          fluid={MediaSet.SmallImage.childImageSharp.fluid}
          alt={Title}
          style={{ width: "100%" }}
        />
      </section>
      <section className="post-header">
        <h1 className="post-header__title">{Title}</h1>
        <div className="post-header__date-author">
          {PublishDate}
          <span>by</span>
          {Author.FullName}
        </div>
      </section>
      <section className="post-content">
        <ReactMarkdown
          source={Content}
          transformImageUri={uri =>
            uri.startsWith("http") ? uri : `http://localhost:1337${uri}`
          }
        />
      </section>
    </Fragment>
  );
}

export default Post;

export const data = graphql`
  query($postId: String!) {
    strapiArticle(id: { eq: $postId }) {
      Author {
        FullName
        Photo {
          childImageSharp {
            fixed {
              src
            }
          }
        }
      }
      Categories
      Content
      MediaSet {
        SmallImage {
          childImageSharp {
            fluid(
              maxWidth: 1200
              maxHeight: 500
              quality: 100
              cropFocus: CENTER
              srcSetBreakpoints: [320, 1200]
            ) {
              ...GatsbyImageSharpFluid_withWebp_noBase64
            }
          }
        }
      }
      Title
      PublishDate(formatString: "DD MMM YYYY")
    }
  }
`;
