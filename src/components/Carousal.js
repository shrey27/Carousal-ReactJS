import Marker from "./Marker";
import Slider from "./Slider";
import Controls from "./Controls";
import SliderItem from "./SliderItem";
import { useState, useCallback } from "react";

export default function Carousal(props) {
  const { imagesArray } = props;
  const sliderItemsLength = imagesArray.length + 2;
  const imagesLength = imagesArray.length;

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
    if (moveValue === sliderItemsLength - 1) {
      setSliderStyle({
        moveValue: 1,
        toAnimate: false,
      });
      setMarkerIndex(0);
    }
    if (moveValue === 1) {
      setSliderStyle({
        moveValue: sliderItemsLength - 1,
        toAnimate: false,
      });
      setMarkerIndex(imagesLength - 1);
    }
    setFlag(true);
  }

  return (
    <div className="carousal-container">
      <div className="carousal">
        <Controls moveLeft={moveLeft} moveRight={moveRight} />
        <Slider
          sliderStyle={sliderStyle}
          handleTransitionEnd={handleTransitionEnd}
          moveLeft={moveLeft}
        >
          {[
            imagesArray[imagesArray.length - 1],
            ...imagesArray,
            imagesArray[0],
          ].map((image, index) => {
            return <SliderItem item={image} key={index} />;
          })}
        </Slider>
        <Marker
          handleJumpToSlide={handleJumpToSlide}
          imagesLength={imagesLength}
          markerIndex={markerIndex}
        />
      </div>
    </div>
  );
}
