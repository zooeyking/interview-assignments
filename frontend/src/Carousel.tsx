import React, { useState, useEffect, useMemo } from "react";
import styles from "./Carousel.module.css";

interface CarouselProps {
  children?: Array<React.ReactElement>;
  suspend?: number;
}

const Carousel: React.FC<CarouselProps> = ({
  suspend = 3000,
  children = [],
}) => {
  const time = ((suspend % 60000) / 1000).toFixed(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [vewPortWidth, setViewPortWidth] = useState(window.innerWidth);

  const onUpdateIndex = (newIndex: number) => {
    if (newIndex < 0) {
      newIndex = children.length - 1;
    } else if (newIndex >= children.length) {
      newIndex = 0;
    }
    setActiveIndex(newIndex);
    replayAnimations();
  };

  const replayAnimations = () => {
    document.getAnimations().forEach((animation) => {
      animation.cancel();
      animation.play();
    });
  };

  const onClickCarouselIndex = (index: number) => {
    onUpdateIndex(index);
    replayAnimations();
  };

  useEffect(() => {
    let interval = setTimeout(() => {
      onUpdateIndex(activeIndex + 1);
      interval = setTimeout(() => {
        onUpdateIndex(activeIndex + 1);
      }, suspend);
    }, suspend);

    return () => {
      if (interval) {
        clearTimeout(interval);
      }
    };
  });

  useEffect(() => {
    const resize = () => {
      const vieportWidth = window.innerWidth;
      console.log({
        vieportWidth,
      });
      setViewPortWidth(vieportWidth);
    };
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  const containerWidth = useMemo(
    () => children.length * vewPortWidth,
    [children, vewPortWidth]
  );

  const translateX = useMemo(
    () => activeIndex * vewPortWidth,
    [activeIndex, vewPortWidth]
  );

  return (
    <div className={styles.container}>
      <div
        className={styles.inner}
        style={{
          width: containerWidth,
          transform: `translateX(-${translateX}px)`,
        }}
      >
        {children}
      </div>
      <div className={styles.loading}>
        {children.map(({ key }, index) => {
          return (
            <div
              key={`indicator-${key}`}
              className={styles.indicatorOuter}
              onClick={() => onClickCarouselIndex(index)}
            >
              <div
                className={styles.indicatorInside}
                style={{
                  animationDuration: index === activeIndex ? `${time}s` : "0s",
                  backgroundColor: index === activeIndex ? "#FFFFFF" : "gray",
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Carousel;
