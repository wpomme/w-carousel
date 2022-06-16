import React from 'react'
import styles from '../styles/Home.module.scss'

type CarouselProps = {
  children: React.ReactNode
  elementWidth: number
  gapBetweenElements?: number
}

export const Carousel: React.VFC<CarouselProps> = ({elementWidth, children, gapBetweenElements = 20}) => {
  const elementLength = React.Children.count(children)
  const maxElementPositionWidth = elementWidth * elementLength
  const [elementContainerPosition, setElementContainerPosition] = React.useState(0)
  const [elementContainerWidth, setElementContainerWidth] = React.useState(elementWidth)

  const moveLength = elementWidth + gapBetweenElements

  return (
    <div className={styles["carousel-container"]}>
      <div className={styles["position-container"]}>
        <div className={styles["element-container"]} style={{ columnGap: `${gapBetweenElements}px`, width: `${elementContainerWidth}px`, left: elementContainerPosition }}>
          {children}
        </div>
      </div>
      <div className={styles["button-container"]} style={{ width: `${elementWidth}px`}}>
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
