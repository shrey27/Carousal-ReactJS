export default function Marker(props) {
  return (
    <div className="slider--marker">
      {Array.from({ length: 5 }, (_, index) => {
        return (
          <span
            className={`slider--marker--items ${index === 0 && "selected"}`}
          ></span>
        );
      })}
    </div>
  );
}
