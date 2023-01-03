import "./App.css";
import Carousal from "./components/Carousal";

const imagesArray = [
  "images/img_1.jpg",
  "images/img_2.jpg",
  "images/img_3.jpg",
  "images/img_4.jpg",
  "images/img_5.jpg",
  "images/img_6.jpg",
  "images/img_7.jpg",
];

function App() {
  return <Carousal imagesArray={imagesArray} />;
}

export default App;
