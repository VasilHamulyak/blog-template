import React, { Fragment } from "react";
import { Link, graphql } from "gatsby";
import Img from "gatsby-image";

import SEO from "components/Seo";
// import Paginate from "components/Paginate";
import Aside from "components/Aside";
import Breadcrumb from "components/Breadcrumb";

const Category = ({
  data: { allContentfulArticle, recentArticles },
  pageContext: { category, categoriesPostCount },
}) => (
  <Fragment>
    <SEO title="Home" />
    <section className="category-page-banner">
      <div className="category-page-banner__wrapper">
        <h1 className="category-page-banner__title">{category}</h1>
        <Breadcrumb
          pathArr={[{ path: "/", label: "Home" }]}
          crumbLabel={category}
        />
      </div>
    </section>
    <section className="category-page-content">
      <div className="category-page-content__wrapper">
        <div className="category-page-content__articles">
          <div className="category-page-content__articles-list">
            {allContentfulArticle.nodes.map(
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
          {/* <Paginate
              pageCount={pageCount}
              linkSuffix="blog"
              currentPage={currentPage}
            /> */}
        </div>
        <Aside
          categories={categoriesPostCount}
          recentArticles={recentArticles}
        />
      </div>
    </section>
  </Fragment>
);

export default Category;

export const data = graphql`
  query($category: String!) {
    allContentfulArticle(
      sort: { fields: publishDate, order: DESC }
      filter: { category: { eq: $category } }
    ) {
      totalCount
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
