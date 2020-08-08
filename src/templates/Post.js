import React, { Fragment } from "react";
import { graphql } from "gatsby";
import Img from "gatsby-image";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

import useContentfulAsset from "../hooks/useContentfulAsset";
import SEO from "components/Seo";
import Breadcrumb from "components/Breadcrumb";
import Article from "components/Article";
import SocialNetworkShare from "components/SocialNetworkShare";
import { SOCIAL_LINKS } from "../constants";

function Post({ data }) {
  const {
    author,
    URL,
    title,
    content,
    category,
    publishDate,
    image,
    interestingForYou,
  } = data.contentfulArticle;

  const options = {
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: node => {
        const { sys } = node.data.target;
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
      [INLINES.HYPERLINK]: node => {
        const {
          data: { uri },
          content: [data],
        } = node;

        return (
          <a href={uri} target="_blank" rel="noopener noreferrer">
            {data.value}
          </a>
        );
      },
    },
  };

  return (
    <Fragment>
      <SEO title="Home" />
      <section className="banner">
        <div className="banner__wrapper">
          <h1 className="banner__title">Post</h1>
          <Breadcrumb
            pathArr={[
              { path: "/", label: "Home" },
              { path: "/blog/", label: "Blog" },
            ]}
            crumbLabel={title}
          />
        </div>
      </section>
      <section className="post-header">
        <h1 className="post-header__title">{title}</h1>
        <div className="post-header__date-author">
          {publishDate}
          <span>by</span>
          {author.fullName}
        </div>
      </section>
      <section className="post-image">
        <Img
          fluid={image.localFile.childImageSharp.fluid}
          alt={title}
          style={{ width: "100%" }}
        />
      </section>
      <section className="post-content">
        {documentToReactComponents(content.json, options)}
        <div className="post-content__share-links">
          {SOCIAL_LINKS.map((socialLink, index) => (
            <SocialNetworkShare
              key={index}
              socialLink={socialLink}
              articleURL={`/blog/${URL}/`}
              articleTitle={title}
            />
          ))}
        </div>
      </section>
      {interestingForYou && (
        <section className="post-related">
          <div className="section-title">
            <h2>You Might Also Like</h2>
          </div>
          <div className="post-related__articles">
            {interestingForYou.map(({ id, title, category, URL, image }) => (
              <Article
                key={id}
                URL={URL}
                title={title}
                image={image}
                category={category}
                size="small"
              />
            ))}
          </div>
        </section>
      )}
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
      URL
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
              maxHeight: 600
              quality: 100
              cropFocus: CENTER
              srcSetBreakpoints: [320, 1200]
            ) {
              ...GatsbyImageSharpFluid_withWebp_noBase64
            }
          }
        }
      }
      interestingForYou {
        URL
        category
        id
        title
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
