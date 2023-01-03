import { useRef, useEffect } from "react";
const INTERVAL = 3000;

export default function Slider(props) {
  const { children, sliderStyle, handleTransitionEnd, moveLeft } = props;
  const timerId = useRef(null);

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
        {children}
      </div>
    </div>
  );
}
