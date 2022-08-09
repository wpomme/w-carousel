import React from 'react'
import styles from './Carousel.module.scss'

type CarouselProps = {
  children: React.ReactNode
  elementWidth: number
  gapBetweenElements?: number
  elementHeight?: number
  elementToHiddenBackgroundColor?: string
}

export const Carousel: React.FC<CarouselProps> = ({
  elementWidth,
  children,
  gapBetweenElements = 20,
  elementHeight = 400,
  elementToHiddenBackgroundColor = "#fff",
}) => {
  const elementLength = React.Children.count(children)
  const maxElementPositionWidth = elementWidth * elementLength
  const [elementContainerPosition, setElementContainerPosition] = React.useState(0)
  const [elementContainerWidth, setElementContainerWidth] = React.useState(elementWidth)
  const [leftToElement, setLeftToElement] = React.useState(0);

  const moveLength = elementWidth + gapBetweenElements

  React.useEffect(() => {
    setLeftToElement((window.innerWidth - elementWidth) / 2)
  }, [elementWidth]);

  return (
    <div className={styles["carousel-container"]}>
      <div className={styles["position-container"]} style={{ marginLeft: `${leftToElement}px`, height: `${elementHeight}px` }}>
        <div className={styles["element-container"]} style={{ columnGap: `${gapBetweenElements}px`, width: `${elementContainerWidth + gapBetweenElements}px`, left: elementContainerPosition }}>
          {children}
        </div>
        <div className={styles["hidden-element"]} style={{ width: `${leftToElement - gapBetweenElements}px`, left: `-${leftToElement}px`, height: `${elementHeight}px`, backgroundColor: `${elementToHiddenBackgroundColor}` }} />
      </div>
      <div className={styles["button-container"]} style={{ width: `${elementWidth}px`, marginLeft: `${leftToElement}px` }}>
        <button
          onClick={() => {
            if (elementContainerPosition + moveLength > 0) return;
            setElementContainerPosition(elementContainerPosition + moveLength);
            setElementContainerWidth(elementContainerWidth - moveLength);
          }}
          disabled={elementContainerPosition + moveLength > 0}
        >
          prev
        </button>
        <button
          onClick={() => {
            if (elementContainerPosition - moveLength < -1 * maxElementPositionWidth) return;
            setElementContainerPosition(elementContainerPosition - moveLength);
            setElementContainerWidth(elementContainerWidth + moveLength);
          }}
          disabled={elementContainerPosition - moveLength < -1 * maxElementPositionWidth}
        >
          next
        </button>
      </div>
    </div>
  );
}
