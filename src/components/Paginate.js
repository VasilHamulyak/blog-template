import React from "react";
import { Link } from "gatsby";
import cn from "classnames";

const Paginate = ({ pageCount, linkSuffix, currentPage }) => {
  const nextPage = pageCount === currentPage ? pageCount : currentPage + 1;
  const prevPage = currentPage <= 2 ? "" : currentPage - 1;

  return (
    <div className="paginate">
      <ul className="paginate__list">
        <li
          className={cn("paginate__item", "paginate__item-prev", {
            "paginate__item--is-disabled": currentPage === 1,
          })}
        >
          <Link
            to={`/${linkSuffix}/${prevPage !== "" ? prevPage + "/" : ""}`}
            className="paginate__link  paginate__link--prev"
          >
            Prev
          </Link>
        </li>
        {Array.from({ length: pageCount }).map((_, i) => {
          // the first and the last page will be render every time
          if (i === 0 || i === pageCount - 1) {
            return (
              <li key={i} className="paginate__item">
                <Link
                  to={i === 0 ? `/${linkSuffix}/` : `/${linkSuffix}/${i + 1}/`}
                  className="paginate__link"
                  activeClassName="paginate__link--is-active"
                >
                  {i + 1}
                </Link>
              </li>
            );
            // render pages between 1 and 4 && 16 and 20
          } else if (
            (currentPage >= 1 && i < 5 && currentPage < 5) ||
            (currentPage > pageCount - 4 && i > pageCount - 6)
          ) {
            return (
              <li key={i} className="paginate__item">
                <Link
                  to={i === 0 ? `/${linkSuffix}/` : `/${linkSuffix}/${i + 1}/`}
                  className="paginate__link"
                  activeClassName="paginate__link--is-active"
                >
                  {i + 1}
                </Link>
              </li>
            );
            // render pages between 5 and 15
          } else if (
            currentPage >= 5 &&
            i > currentPage - 3 &&
            i < currentPage + 1
          ) {
            return (
              <li key={i} className="paginate__item">
                <Link
                  to={i === 0 ? `/${linkSuffix}/` : `/${linkSuffix}/${i + 1}/`}
                  className="paginate__link"
                  activeClassName="paginate__link--is-active"
                >
                  {i + 1}
                </Link>
              </li>
            );
            // render break item
          } else if (
            (currentPage >= 5 && i === 1) ||
            (i === pageCount - 2 && i + 1 !== currentPage)
          ) {
            return (
              <li key={i} className="paginate__break">
                ...
              </li>
            );
          }
        })}
        <li
          className={cn("paginate__item", "paginate__item-next", {
            "paginate__item--is-disabled": currentPage === pageCount,
          })}
        >
          <Link
            to={`/${linkSuffix}/${nextPage}/`}
            className="paginate__link paginate__link--next"
          >
            Next
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Paginate;
