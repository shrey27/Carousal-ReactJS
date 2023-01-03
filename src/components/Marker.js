export default function Marker(props) {
  const { handleJumpToSlide, markerIndex, imagesLength } = props;
  return (
    <div className="slider--marker">
      {Array.from({ length: imagesLength }, (_, index) => {
        return (
          <span
            key={index}
            className={`slider--marker--items ${
              index === markerIndex && "selected"
            }`}
            onClick={handleJumpToSlide}
          ></span>
        );
      })}
    </div>
  );
}
