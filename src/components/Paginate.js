import React from "react";
import { Link } from "gatsby";
import cn from "classnames";

function Paginate({ pageCount, linkSuffix, currentPage }) {
  const nextPage = pageCount === currentPage ? pageCount : currentPage + 1;
  const prevPage = currentPage <= 2 ? "" : currentPage - 1;

  return (
    <div className="paginate">
      <ul className="paginate__list">
        <li
          className={cn("paginate__item", {
            "paginate__item--is-disabled": currentPage === 1,
          })}
        >
          <Link
            to={`/${linkSuffix}/${prevPage !== "" ? prevPage + "/" : ""}`}
            className="paginate__link  paginate__link--prev"
          >
            <i className="icon-chevron-left" />
          </Link>
        </li>
        {Array.from({ length: pageCount }).map((_, i) => (
          <li key={i} className="paginate__item">
            <Link
              to={i === 0 ? `/${linkSuffix}/` : `/${linkSuffix}/${i + 1}/`}
              className="paginate__link"
              activeClassName="paginate__link--is-active"
            >
              {i + 1}
            </Link>
          </li>
        ))}
        <li
          className={cn("paginate__item", {
            "paginate__item--is-disabled": currentPage === pageCount,
          })}
        >
          <Link
            to={`/${linkSuffix}/${nextPage}/`}
            className="paginate__link paginate__link--next"
          >
            <i className="icon-chevron-right" />
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Paginate;
