import "./App.css";
import Iphone from "./assets/iphone.png";
import Tablet from "./assets/tablet.png";
import Airpods from "./assets/airpods.png";
import Carousel from "./Carousel";
import CarouselItem from "./CarouselItem";

// 轮播图数据
const bannerList = [
  {
    id: 1,
    key: "Iphone",
    title: "xPhone",
    describe: "Lots to love.Less to spend. /n Starting at $399",
    textColor: "#ffffff",
    image: Iphone,
    backgroundColor: "#000000",
  },
  {
    id: 2,
    key: "Tablet",
    title: "Tablet",
    describe: "Just the right amount of everything.",
    textColor: "#000000",
    image: Tablet,
    backgroundColor: "#1bd1a5",
  },
  {
    id: 3,
    key: "Airpods",
    title: "Buy a Tablet or xPhone for collage. /n Get arPods",
    textColor: "#000000",
    image: Airpods,
    backgroundColor: "#a78e44",
  },
];

function App() {
  return (
    <div className="App">
      {/* write your component here */}
      <Carousel suspend={5000}>
        {bannerList.map(
          ({ key, backgroundColor, title, describe, image, textColor }) => {
            return (
              <CarouselItem
                key={key}
                title={title}
                describe={describe}
                image={image}
                textColor={textColor}
                bgColor={backgroundColor}
              />
            );
          }
        )}
      </Carousel>
    </div>
  );
}

export default App;
