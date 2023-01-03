export default function Controls(props) {
  const { moveLeft, moveRight } = props;
  return (
    <>
      <button className="btn btn--left" onClick={moveLeft}>
        {"<<"}
      </button>
      <button className="btn btn--right" onClick={moveRight}>
        {">>"}
      </button>
    </>
  );
}
