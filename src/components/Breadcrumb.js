import React, { Fragment } from "react";
import { Link } from "gatsby";

const Breadcrumb = ({ pathArr, crumbLabel }) => {
  return (
    <div className="breadcrumb">
      {pathArr.map(({ path, label }, i) => (
        <Fragment key={i}>
          <Link to={path} className="breadcrumb__item">
            {label}
          </Link>
          <span className="breadcrumb__divider">/</span>
        </Fragment>
      ))}
      <span className="breadcrumb__item">{crumbLabel}</span>
    </div>
  );
};

export default Breadcrumb;
