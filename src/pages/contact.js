import React, { Fragment } from "react";
import cn from "classnames";
import { graphql } from "gatsby";
import Img from "gatsby-image";
import Slider from "react-slick";

import SEO from "../components/Seo";
import Breadcrumb from "components/Breadcrumb";
import { SOCIAL_LINKS, EMAIL_REGEX } from "../constants";

const NextArrow = ({ onClick }) => (
  <span className="slider-arrow slider-arrow--next">
    <i className="icon-chevron-right slider-arrow__icon" onClick={onClick} />
  </span>
);

const PrevArrow = ({ onClick }) => (
  <span className="slider-arrow slider-arrow--prev">
    <i className="icon-chevron-left slider-arrow__icon" onClick={onClick} />
  </span>
);

const ContactPage = ({ data }) => {
  const { contentJson, image } = data;

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    autoplay: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <Fragment>
      <SEO title="Contact Us" />
      <section className="post-banner">
        <div className="post-banner__wrapper">
          <h1 className="post-banner__title">Contact Us</h1>
          <Breadcrumb
            pathArr={[{ path: "/", label: "Home" }]}
            crumbLabel="Contact"
          />
        </div>
      </section>
      <section className="contact-page-image">
        <Img fluid={image.childImageSharp.fluid} />
      </section>
      <section className="contact-page-content">
        <div className="contact-page-content__wrapper">
          <div className="contact-page-information">
            <div className="section-title section-title--left section-title--mb-small">
              <h3>Our Location</h3>
            </div>
            <div className="contact-page-information__item">
              <i className="icon-map-marker contact-page-information__icon" />
              <p>2299 Frosty Lane, Burdett, NY, 14818</p>
            </div>
            <div className="contact-page-information__item">
              <i className="icon-phone contact-page-information__icon" />
              <div>
                <p>607-546-7196</p>
                <p>917-918-8098</p>
              </div>
            </div>
            <div className="contact-page-information__item">
              <i className="icon-envelope-o contact-page-information__icon" />
              <div>
                <p>blog-service@gmail.com</p>
                <p>blog-feetback@gmail.com</p>
              </div>
            </div>
          </div>
          <div>
            <div className="section-title section-title--left section-title--mb-small">
              <h3>Follow Us</h3>
            </div>
            <div className="contact-page-follow-us">
              {SOCIAL_LINKS.map(({ name, icon, link }) => (
                <a
                  key={name}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "contact-page-follow-us__item",
                    `contact-page-follow-us__item--${name.toLowerCase()}`
                  )}
                >
                  <i className={icon} />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="contact-page-content__wrapper">
          <form className="contact-page-form">
            <div className="section-title section-title--left section-title--mb-small">
              <h3>Contact Us</h3>
            </div>
            <fieldset>
              <input
                type="text"
                className="contact-page-form__input"
                placeholder="Name"
              />
              <input
                type="email"
                className="contact-page-form__input"
                placeholder="Email"
              />
              <input
                type="phone"
                className="contact-page-form__input"
                placeholder="Phone"
              />
              <textarea
                className="contact-page-form__textarea"
                placeholder="Message"
              ></textarea>
            </fieldset>
            <button className="contact-page-form__submit-button">
              Get in touch
            </button>
          </form>
        </div>
      </section>
      <section className="contact-page-instagram-news-feed">
        <div className="section-title">
          <h2>Latest from our Instagram</h2>
        </div>
        <Slider {...settings}>
          {contentJson.list.map(({ id, link, likes, comments, image }) => (
            <div key={id} className="contact-page-slide-item">
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-page-slide-item__link"
              >
                <div className="contact-page-slide-item__content">
                  <span className="contact-page-slide-item__info">
                    <i className="icon-heart contact-page-slide-item__icon" />
                    {likes}
                  </span>
                  <span className="contact-page-slide-item__info">
                    <i className="icon-comments contact-page-slide-item__icon" />
                    {comments}
                  </span>
                </div>
                <Img fluid={image.childImageSharp.fluid} />
              </a>
            </div>
          ))}
        </Slider>
      </section>
    </Fragment>
  );
};

export default ContactPage;

export const data = graphql`
  query {
    contentJson(id: { eq: "istagram" }) {
      list {
        id
        comments
        image {
          childImageSharp {
            fluid(
              maxWidth: 260
              maxHeight: 360
              quality: 100
              cropFocus: CENTER
              srcSetBreakpoints: [260]
            ) {
              ...GatsbyImageSharpFluid_withWebp_noBase64
            }
          }
        }
        likes
        link
      }
    }
    image: file(relativePath: { eq: "contact-us-banner.jpg" }) {
      childImageSharp {
        fluid(
          maxWidth: 1200
          maxHeight: 600
          quality: 85
          srcSetBreakpoints: [1200]
        ) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
  }
`;
