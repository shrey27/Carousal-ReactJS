import { useRef, useEffect, useState, useCallback } from "react";
// import SliderItem from "./SliderItem";

const INTERVAL = 3000;

const images = [
  "images/img_1.jpg",
  "images/img_2.jpg",
  "images/img_3.jpg",
  "images/img_4.jpg",
  "images/img_5.jpg",
];

const sliderItems = [images[images.length - 1], ...images, images[0]];

export default function Slider() {
  const timerId = useRef(null);
  const [sliderStyle, setSliderStyle] = useState({
    moveValue: 1,
    toAnimate: true,
  });

  function handleTransitionEnd() {
    const { moveValue } = sliderStyle;
    if (moveValue === sliderItems.length - 1) {
      setSliderStyle({
        moveValue: 1,
        toAnimate: false,
      });
    }
    // if (moveValue === 1) {
    //   setSliderStyle({
    //     moveValue: sliderItems.length - 1,
    //     toAnimate: false,
    //   });
    // }
  }

  const moveLeft = useCallback(() => {
    setSliderStyle((obj) => ({
      moveValue: obj.moveValue + 1,
      toAnimate: true,
    }));
  }, []);

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
    <div className="slider--wrapper">
      <div
        className="slider"
        style={styleObj}
        onTransitionEnd={handleTransitionEnd}
      >
        <img src="images/img_5.jpg" className="slider--item" alt="SLIDERITEM" />
        <img src="images/img_1.jpg" className="slider--item" alt="SLIDERITEM" />
        <img src="images/img_2.jpg" className="slider--item" alt="SLIDERITEM" />
        <img src="images/img_3.jpg" className="slider--item" alt="SLIDERITEM" />
        <img src="images/img_4.jpg" className="slider--item" alt="SLIDERITEM" />
        <img src="images/img_5.jpg" className="slider--item" alt="SLIDERITEM" />
        <img src="images/img_1.jpg" className="slider--item" alt="SLIDERITEM" />
      </div>
    </div>
  );
}
