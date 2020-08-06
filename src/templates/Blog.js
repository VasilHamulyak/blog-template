import React, { Fragment } from "react";
import { graphql } from "gatsby";

import SEO from "components/Seo";
import Paginate from "components/Paginate";
import Aside from "components/Aside";
import Breadcrumb from "components/Breadcrumb";
import Article from "components/Article";

const Blog = ({
  data: { allContentfulArticle, recentArticles },
  pageContext: { pageCount, currentPage, categoriesPostCount },
}) => (
  <Fragment>
    <SEO title="Home" />
    <section className="banner">
      <div className="banner__wrapper">
        <h1 className="banner__title">Our Blog</h1>
        <Breadcrumb
          pathArr={[{ path: "/", label: "Home" }]}
          crumbLabel="Blog"
        />
      </div>
    </section>
    <section className="blog-page-content">
      <div className="blog-page-content__wrapper">
        <div className="blog-page-content__articles">
          <div className="blog-page-content__articles-list">
            {allContentfulArticle.nodes.map(
              ({ id, title, category, URL, shortDescription, image }) => (
                <Article
                  key={id}
                  URL={URL}
                  title={title}
                  image={image}
                  category={category}
                  size="medium"
                  shortDescription={shortDescription}
                />
              )
            )}
          </div>
          <Paginate
            pageCount={pageCount}
            linkSuffix="blog"
            currentPage={currentPage}
          />
        </div>
        <Aside
          categories={categoriesPostCount}
          recentArticles={recentArticles}
        />
      </div>
    </section>
  </Fragment>
);

export default Blog;

export const data = graphql`
  query($skip: Int!, $limit: Int!) {
    allContentfulArticle(
      sort: { fields: publishDate, order: DESC }
      skip: $skip
      limit: $limit
    ) {
      nodes {
        URL
        title
        id
        publishDate(formatString: "DD MMMM YYYY")
        category
        shortDescription {
          shortDescription
        }
        image {
          localFile {
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
    recentArticles: allContentfulArticle(
      sort: { fields: publishDate, order: DESC }
      limit: 3
    ) {
      nodes {
        URL
        title
        id
        publishDate(formatString: "DD MMMM YYYY")
        author {
          fullName
        }
        image {
          localFile {
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
