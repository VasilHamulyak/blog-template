import React, { Fragment } from "react";
import { graphql } from "gatsby";
import { GatsbySeo } from "gatsby-plugin-next-seo";

// import Paginate from "components/Paginate";
import Aside from "components/Aside";
import Breadcrumb from "components/Breadcrumb";
import Article from "components/Article";

const Category = ({
  data: { site, allContentfulArticle, recentArticles, sharedImage },
  pageContext: { category, categoriesPostCount },
}) => (
  <Fragment>
    <GatsbySeo
      title={`${category} category`}
      description={site.siteMetadata.description}
      openGraph={{
        url: site.siteMetadata.siteUrl + `/category/${category.toLowerCase()}/`,
        title: `${category} category`,
        description: site.siteMetadata.description,
        images: [
          {
            url:
              site.siteMetadata.siteUrl +
              sharedImage.childImageSharp.resize.src,
            width: sharedImage.childImageSharp.resize.width,
            height: sharedImage.childImageSharp.resize.height,
            alt: "Life Style Blog",
          },
        ],
      }}
    />
    <section className="banner">
      <div className="banner__wrapper">
        <h1 className="banner__title">{category}</h1>
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
    site {
      siteMetadata {
        siteUrl
        description
      }
    }
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
    sharedImage: file(relativePath: { eq: "shared-images/blog-page.jpg" }) {
      childImageSharp {
        resize(width: 1200, height: 600, quality: 100) {
          width
          src
          height
        }
      }
    }
  }
`;
