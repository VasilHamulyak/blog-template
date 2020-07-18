import React, { Fragment } from "react";
import { Link, graphql } from "gatsby";
import Img from "gatsby-image";
import { BLOCKS } from "@contentful/rich-text-types";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

import useContentfulAsset from "../hooks/useContentfulAsset";
import SEO from "components/Seo";

function Post({ data }) {
  const {
    author,
    title,
    content,
    category,
    publishDate,
    image,
  } = data.contentfulArticle;

  const options = {
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: node => {
        const { sys } = node.data.target;
        console.log("3OedRNpnUF77Espk7XHkTs", sys.id);
        const { localFile, title, description } = useContentfulAsset(
          sys.contentful_id
        );

        return (
          <figure className="embedded-asset">
            <img
              className="embedded-asset__image"
              src={localFile.childImageSharp.original.src}
              alt={title}
            />
            {description && (
              <figcaption className="embedded-asset__caption">
                {description}
              </figcaption>
            )}
          </figure>
        );
      },
    },
  };

  console.log(content);

  return (
    <Fragment>
      <SEO title="Home" />
      <section className="post-banner">
        <div className="post-banner__wrapper">
          <h1 className="post-banner__title">{category}</h1>
          <div className="post-banner__breadcrumbs">
            <Link to="/">Home</Link>
            <span className="slash">/</span>
            <Link to="/blog/">Blog</Link>
            <span className="slash">/</span>
            <span>{title}</span>
          </div>
        </div>
      </section>
      <section className="post-image">
        <Img
          fluid={image.localFile.childImageSharp.fluid}
          alt={title}
          style={{ width: "100%" }}
        />
      </section>
      <section className="post-header">
        <h1 className="post-header__title">{title}</h1>
        <div className="post-header__date-author">
          {publishDate}
          <span>by</span>
          {author.fullName}
        </div>
      </section>
      <section className="post-content">
        {documentToReactComponents(content.json, options)}
      </section>
    </Fragment>
  );
}

export default Post;

export const data = graphql`
  query($postId: String!) {
    contentfulArticle(id: { eq: $postId }) {
      author {
        fullName
      }
      category
      content {
        json
      }
      title
      publishDate(formatString: "DD MMM YYYY")
      image {
        localFile {
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
    }
  }
`;
