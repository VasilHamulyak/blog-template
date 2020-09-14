import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { createPortal } from "react-dom";

import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsModalOpen(true);
    }, 10 * 1000);
  }, []);

  const onCloseModal = event => {
    if (event?.target?.dataset?.target) {
      setIsModalOpen(false);
    }
  };

  return (
    <Fragment>
      <Header />
      <main>{children}</main>
      <Footer />
      {isModalOpen &&
        createPortal(
          <div className="modal" data-target="modal" onClick={onCloseModal}>
            <div className="modal__content">
              <span
                className="modal__close"
                onClick={() => setIsModalOpen(false)}
              >
                <i className="icon-close modal__icon" />
              </span>
              <h2>Hi there! My name is Vasyl.</h2>
              <p className="modal__text">
                Thanks, that you watch my template for the blog. It is created
                by Gatsby and Contentful. This stack is pretty easy, powerful,
                and fast to implement, has a lot of features and possibilities.
              </p>
              <h4>Contact me if you have idea or project</h4>
              <p className="modal__contact-info">
                <i className="icon-envelope-o modal__icon" />
                <span>vasil.hamulyak@gmail.com</span>
              </p>
              <p className="modal__contact-info">
                <i className="icon-phone modal__icon" />
                <span>+380967817191</span>
              </p>
            </div>
          </div>,
          document.body
        )}
    </Fragment>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
