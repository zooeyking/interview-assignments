import React, { useMemo } from "react";
import styles from "./Carousel.module.css";

interface BannerType {
  id?: string | number;
  key: React.Key;
  title?: string;
  describe?: string;
  textColor?: string;
  image?: string;
  bgColor: string;
}

export const CarouselItem: React.FC<BannerType> = ({
  title = "",
  describe = "",
  image,
  bgColor,
  textColor,
}) => {
  const bgStyle = useMemo(
    () =>
      image
        ? {
            backgroundImage: `url(${image})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center center",
            backgroundSize: "cover",
            backgroundColor: bgColor,
            width: window.innerWidth,
            color: textColor,
          }
        : {
            backgroundColor: bgColor,
            width: window.innerWidth,
            color: textColor,
          },
    [image, window.innerWidth]
  );

  const titles = useMemo(
    () => title.split("/n").map((str) => str.trim()),
    [title]
  );

  const desInfos = useMemo(
    () => describe.split("/n").map((str) => str.trim()),
    [describe]
  );

  return (
    <div className={styles.carouselItem} style={bgStyle}>
      <div className={styles.carouselInfoWrapper}>
        {/* <h1 className="title">{title}</h1> */}

        {titles.map((title, index) => (
          <div key={`${title}_${index}`} className="title">
            {title}
          </div>
        ))}
        {desInfos.map((info, index) => (
          <div key={`${info}_${index}`} className="text">
            {info}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarouselItem;
