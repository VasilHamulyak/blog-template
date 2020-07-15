import React, { useState, useEffect } from "react";
import Img from "gatsby-image";
import { Link } from "gatsby";
import { Swipeable } from "react-swipeable";
import cn from "classnames";

function Slider({ slideList }) {
  const [slideIndex, setSlideIndex] = useState(0);
  const slideLength = slideList.length - 1;
  const isSliderActive = slideList.length > 1;

  function onPrev() {
    if (slideIndex >= 1) {
      setSlideIndex(slideIndex - 1);
    } else {
      setSlideIndex(slideLength);
    }
  }

  function onNext() {
    if (slideIndex < slideLength) {
      setSlideIndex(slideIndex + 1);
    } else {
      setSlideIndex(0);
    }
  }

  useEffect(() => {
    const interval = setInterval(
      () => {
        setSlideIndex(slideIndex =>
          slideIndex < slideLength ? slideIndex + 1 : 0
        );
      },
      isSliderActive ? 5000 : null
    );

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="slider">
      {isSliderActive && (
        <button
          className="slider__button slider__button--prev"
          onClick={onPrev}
        >
          <i className="icon-chevron-left" />
        </button>
      )}
      {isSliderActive && (
        <button
          className="slider__button slider__button--next"
          onClick={onNext}
        >
          <i className="icon-chevron-right" />
        </button>
      )}
      <Swipeable onSwipedLeft={() => onPrev()} onSwipedRight={() => onNext()}>
        {slideList.map(
          ({ id, Title, Categories, URL, PublishDate, MediaSet }, index) => (
            <div
              key={id}
              className={cn("slider__item", {
                "slider__item--is-shown": slideIndex === index,
              })}
            >
              <Img fluid={MediaSet.MainImage.childImageSharp.fluid} />
              <div className="slider__content">
                <p className="slider__categories">{Categories}</p>
                <Link to={`/blog/${URL}/`}>
                  <h2 className="slider__title">{Title}</h2>
                </Link>
                <p className="slider__publish-date">{PublishDate}</p>
                <Link to={`/blog/${URL}/`} className="slider__link-button">
                  Read more
                </Link>
              </div>
            </div>
          )
        )}
      </Swipeable>
    </div>
  );
}

export default Slider;
