import React, { Fragment } from "react";
import { createPortal } from "react-dom";

const Dialog = ({ children, isOpen, onCloseClick }) => {
  const closeModal = event => {
    if (event?.target?.dataset?.target) {
      onCloseClick();
    }
  };

  return (
    <Fragment>
      {isOpen &&
        createPortal(
          <div className="dialog" onClick={closeModal} data-target="dialog">
            <div className="dialog__content">
              <span className="dialog__close" onClick={onCloseClick}>
                <i className="icon-close dialog__icon" />
              </span>
              {children}
            </div>
          </div>,
          document.body
        )}
    </Fragment>
  );
};

export default Dialog;
