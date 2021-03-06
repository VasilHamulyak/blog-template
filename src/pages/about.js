import React, { Fragment } from "react";
import { graphql } from "gatsby";
import Img from "gatsby-image";
import cn from "classnames";
import { GatsbySeo } from "gatsby-plugin-next-seo";

import Breadcrumb from "components/Breadcrumb";

const AboutPage = ({ data }) => {
  const { site, allContentfulAuthor, sharedImage } = data;
  return (
    <Fragment>
      <GatsbySeo
        title="About"
        description={site.siteMetadata.description}
        openGraph={{
          url: site.siteMetadata.siteUrl + "/about/",
          title: "About",
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
          <h1 className="banner__title">About</h1>
          <Breadcrumb
            pathArr={[{ path: "/", label: "Home" }]}
            crumbLabel="About"
          />
        </div>
      </section>
      <section className="about-page-authors">
        <div className="section-title">
          <h2>Our authors</h2>
        </div>
        <Fragment>
          {allContentfulAuthor.nodes.map(
            ({
              id,
              fullName,
              photo,
              categories,
              information,
              instagramURL,
              linkedinURL,
              facebookURL,
              email,
            }) => (
              <div key={id} className="author">
                <div className="author__photo">
                  <Img
                    fixed={photo.localFile.childImageSharp.fixed}
                    alt={fullName}
                  />
                  <div className="author__email">{email}</div>
                  <div className="author-follow-me">
                    {instagramURL && (
                      <a
                        href={instagramURL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                          "author-follow-me__item",
                          "author-follow-me__item--instagram"
                        )}
                      >
                        <i className="icon-instagram" />
                      </a>
                    )}
                    {linkedinURL && (
                      <a
                        href={linkedinURL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                          "author-follow-me__item",
                          "author-follow-me__item--linkedin"
                        )}
                      >
                        <i className="icon-linkedin" />
                      </a>
                    )}
                    {facebookURL && (
                      <a
                        href={facebookURL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                          "author-follow-me__item",
                          "author-follow-me__item--facebook"
                        )}
                      >
                        <i className="icon-facebook" />
                      </a>
                    )}
                  </div>
                </div>
                <div className="author__content">
                  <h3 className="author__fullName">{fullName}</h3>
                  <p className="author__information">
                    {information.information}
                  </p>
                  <div className="author__categories">
                    <span>Categories:</span>
                    <div className="author__categoriesList">
                      {categories.join(", ")}
                    </div>
                  </div>
                </div>
              </div>
            )
          )}
        </Fragment>
      </section>
    </Fragment>
  );
};

export default AboutPage;

export const data = graphql`
  query {
    site {
      siteMetadata {
        siteUrl
        description
      }
    }
    allContentfulAuthor {
      nodes {
        fullName
        id
        photo {
          localFile {
            childImageSharp {
              fixed(width: 200, height: 240, cropFocus: CENTER, quality: 100) {
                ...GatsbyImageSharpFixed_withWebp_noBase64
              }
            }
          }
        }
        instagramURL
        linkedinURL
        facebookURL
        email
        categories
        information {
          information
        }
      }
    }
    sharedImage: file(relativePath: { eq: "shared-images/about-page.jpg" }) {
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
