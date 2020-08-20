import React, { Fragment } from "react";
import { graphql } from "gatsby";
import Img from "gatsby-image";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { GatsbySeo, ArticleJsonLd } from "gatsby-plugin-next-seo";

import useContentfulAsset from "../hooks/useContentfulAsset";
import Breadcrumb from "components/Breadcrumb";
import Article from "components/Article";
import SocialNetworkShare from "components/SocialNetworkShare";
import { transformRobotsToBoolean } from "../shared/utils";
import { SOCIAL_LINKS } from "../constants";

function Post({ data }) {
  const {
    site,
    contentfulArticle: {
      author,
      URL,
      title,
      robots,
      category,
      content,
      shortDescription,
      formattedPublishDate,
      publishDate,
      updatedAt,
      image,
      interestingForYou,
    },
  } = data;

  const { noindex, nofollow } = transformRobotsToBoolean(robots);
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
      <GatsbySeo
        title="Home"
        description={shortDescription.shortDescription}
        noindex={noindex}
        nofollow={nofollow}
        openGraph={{
          url: site.siteMetadata.siteUrl + "/blog/" + URL + "/",
          title: "About",
          description: shortDescription.shortDescription,
          type: "article",
          article: {
            publishedTime: publishDate,
            modifiedTime: updatedAt,
            authors: [author.fullName],
            tags: [category],
          },
          images: [
            {
              url: site.siteMetadata.siteUrl + image.localFile.publicURL,
              width: 1200,
              height: 600,
              alt: "Life Style Blog",
            },
          ],
        }}
      />
      <ArticleJsonLd
        url={site.siteMetadata.siteUrl + "/blog/" + URL + "/"}
        headline="Article headline"
        images={[site.siteMetadata.siteUrl + image.localFile.publicURL]}
        datePublished={publishDate}
        dateModified={updatedAt}
        authorName={author.fullName}
        publisherName={author.fullName}
        publisherLogo={
          site.siteMetadata.siteUrl + author.photo.localFile.publicURL
        }
        description={shortDescription.shortDescription}
        overrides={{
          "@type": "BlogPosting",
        }}
      />
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
          {formattedPublishDate}
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
    site {
      siteMetadata {
        siteUrl
      }
    }
    contentfulArticle(id: { eq: $postId }) {
      author {
        fullName
        photo {
          localFile {
            publicURL
          }
        }
      }
      URL
      category
      content {
        json
      }
      shortDescription {
        shortDescription
      }
      title
      robots
      formattedPublishDate: publishDate(formatString: "DD MMM YYYY")
      publishDate
      updatedAt
      image {
        localFile {
          publicURL
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
              resize(width: 1200, height: 600, quality: 100) {
                width
                src
                height
              }
            }
          }
        }
      }
    }
  }
`;
