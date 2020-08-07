import React, { useEffect } from "react";

const Backdrop = ({ onBackdropClick }) => {
  useEffect(() => {
    const scrollPosition = window.scrollY;
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollPosition}px`;

    return () => {
      const scrollPosition = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      window.scrollTo(0, parseInt(scrollPosition) * -1);
    };
  }, []);

  return <div className="backdrop" onClick={onBackdropClick} />;
};

export default Backdrop;
