// import Marker from "./Marker";
// import Slider from "./Slider";
import { useRef, useEffect, useState, useCallback } from "react";

const INTERVAL = 3000;

const images = [
  "images/img_1.jpg",
  "images/img_2.jpg",
  "images/img_3.jpg",
  "images/img_4.jpg",
  "images/img_5.jpg",
];

const sliderItems = [images[images.length - 1], ...images, images[0]];

export default function Carousal(props) {
  const timerId = useRef(null);
  const [sliderStyle, setSliderStyle] = useState({
    moveValue: 1,
    toAnimate: true,
  });
  const [flag, setFlag] = useState(true);
  const [markerIndex, setMarkerIndex] = useState(0);

  const moveLeft = useCallback(() => {
    if (flag) {
      setMarkerIndex((e) => e + 1);
      setSliderStyle((obj) => ({
        moveValue: obj.moveValue + 1,
        toAnimate: true,
      }));
      setFlag(false);
    }
  }, [flag]);

  const moveRight = () => {
    if (flag) {
      setMarkerIndex((e) => e - 1);
      setSliderStyle((obj) => ({
        moveValue: obj.moveValue - 1,
        toAnimate: true,
      }));
      setFlag(false);
    }
  };

  function handleJumpToSlide(idx) {
    if (flag) {
      setSliderStyle({
        moveValue: idx + 1,
        toAnimate: true,
      });
      setMarkerIndex(idx);
      setFlag(false);
    }
  }

  function handleTransitionEnd() {
    const { moveValue } = sliderStyle;
    if (moveValue === sliderItems.length - 1) {
      setSliderStyle({
        moveValue: 1,
        toAnimate: false,
      });
      setMarkerIndex(0);
    }
    if (moveValue === 1) {
      setSliderStyle({
        moveValue: sliderItems.length - 1,
        toAnimate: false,
      });
      setMarkerIndex(images.length - 1);
    }
    setFlag(true);
  }

  useEffect(() => {
    timerId.current = setInterval(() => {
      console.log("called");
      moveLeft();
    }, INTERVAL);
    return () => clearInterval(timerId.current);
  }, [moveLeft]);

  const styleObj = {
    transform: `translateX(-${sliderStyle.moveValue * 100}%)`,
    transition: sliderStyle.toAnimate ? `1000ms ease-in-out` : `none`,
  };

  return (
    <div className="carousal-container">
      <div className="carousal">
        <button className="btn btn--left" onClick={moveLeft}>
          {"<<"}
        </button>
        <button className="btn btn--right" onClick={moveRight}>
          {">>"}
        </button>
        {/* <Slider /> */}
        <div className="slider--wrapper">
          <div
            className="slider"
            style={styleObj}
            onTransitionEnd={handleTransitionEnd}
          >
            <img
              src="images/img_5.jpg"
              className="slider--item"
              alt="SLIDERITEM"
            />
            <img
              src="images/img_1.jpg"
              className="slider--item"
              alt="SLIDERITEM"
            />
            <img
              src="images/img_2.jpg"
              className="slider--item"
              alt="SLIDERITEM"
            />
            <img
              src="images/img_3.jpg"
              className="slider--item"
              alt="SLIDERITEM"
            />
            <img
              src="images/img_4.jpg"
              className="slider--item"
              alt="SLIDERITEM"
            />
            <img
              src="images/img_5.jpg"
              className="slider--item"
              alt="SLIDERITEM"
            />
            <img
              src="images/img_1.jpg"
              className="slider--item"
              alt="SLIDERITEM"
            />
          </div>
        </div>
        <div className="slider--marker">
          <span
            className={`slider--marker--items ${
              0 === markerIndex && "selected"
            }`}
            onClick={() => handleJumpToSlide(0)}
          ></span>
          <span
            className={`slider--marker--items ${
              1 === markerIndex && "selected"
            }`}
            onClick={() => handleJumpToSlide(1)}
          ></span>
          <span
            className={`slider--marker--items ${
              2 === markerIndex && "selected"
            }`}
            onClick={() => handleJumpToSlide(2)}
          ></span>
          <span
            className={`slider--marker--items ${
              3 === markerIndex && "selected"
            }`}
            onClick={() => handleJumpToSlide(3)}
          ></span>
          <span
            className={`slider--marker--items ${
              4 === markerIndex && "selected"
            }`}
            onClick={() => handleJumpToSlide(4)}
          ></span>
        </div>
        {/* <Marker /> */}
      </div>
    </div>
  );
}
