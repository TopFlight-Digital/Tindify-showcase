import { h } from 'preact';
import { useEffect } from 'preact/hooks';
import domGet from '@utils/dom/domGet';
import TinderCard from 'react-tinder-card';

const selectors = {
  animationContainer: (): string => '[data-ref="animation-container"]',
  animationIcon: (direction: string): string =>
    `[data-ref="animation-container"] [data-ref="${direction}"]`,
  cardNode: (index: number): string => `[data-ref="card-container"] > *:nth-child(${index})`,
};

type FlickerDirection = 'up' | 'down' | 'left' | 'right';

type FlickerComponentType = (props: FlickerComponentProps) => any;

interface FlickerComponentProps {
  dataItem: HTMLElement;
}

interface FlickerProps {
  onEndCallback: () => void;
  onSwipeCallback: (direction: FlickerDirection, dataItem: HTMLElement) => void;
  SwipeIconUp?: any;
  SwipeIconDown?: any;
  SwipeIconLeft?: any;
  SwipeIconRight?: any;
  Component: FlickerComponentType;
  dataMap: HTMLElement[];
  [key: string]: any;
}

let lastCardIndexSwiped: number | null = null;
let flickUrlTracker: string | null = null;

export default function Flicker({
  dataMap,
  Component,
  onEndCallback,
  onSwipeCallback,
  SwipeIconUp,
  SwipeIconDown,
  SwipeIconLeft,
  SwipeIconRight,
  ...rest
}: FlickerProps) {
  const handleAnimationEffect = (direction: FlickerDirection) => {
    const animationContainerSelector = selectors.animationContainer();
    const animationIcon = selectors.animationIcon(direction);
    domGet(animationIcon)?.classList.add('icon-show');
    domGet(animationContainerSelector)?.classList.add('pulse');
    setTimeout(() => {
      domGet(animationIcon)?.classList.remove('icon-show');
      domGet(animationContainerSelector)?.classList.remove('pulse');
    }, 501);
  };

  const setLastCardIndexSwiped = (index: number | null): void => {
    lastCardIndexSwiped = index;
  };

  const domGetByIndex = (index: number): HTMLElement | null => {
    const selector = selectors.cardNode(index);
    return domGet(selector);
  };

  const handleRevealCards = (index: number) => {
    const revealCardNodes = domGetByIndex(index);
    if (revealCardNodes) revealCardNodes.style.display = 'block';
  };

  const resetCardIndex = () => {
    lastCardIndexSwiped = null;
  };

  const setUrlTracker = (plpUrl: string | null) => {
    flickUrlTracker = plpUrl;
  };

  const handleCardsReset = () => {
    const plpUrl = window.location.href;
    if (!flickUrlTracker) {
      setUrlTracker(plpUrl);
    } else if (plpUrl !== flickUrlTracker) {
      resetCardIndex();
      setUrlTracker(plpUrl);
    }
  };

  const swiped = (direction: FlickerDirection, dataItem: HTMLElement, index: number) => {
    const nextCard = index + 1;
    if (index >= dataMap.length && onEndCallback) {
      return onEndCallback();
    } else {
      handleAnimationEffect(direction);
      handleRevealCards(nextCard);
      setLastCardIndexSwiped(nextCard);
      onSwipeCallback(direction, dataItem);
    }
  };

  useEffect(() => {
    const nextCard = (lastCardIndexSwiped as number) + 1;
    handleRevealCards(nextCard);
  }, [dataMap.length]);

  handleCardsReset();

  return (
    <div className="flick-card-container" data-ref="card-container">
      {dataMap.map((dataItem, index) => {
        const nodeIndex = index + 1;
        return (
          <TinderCard
            className="flick-card"
            key={index}
            onSwipe={(dir: FlickerDirection) => swiped(dir, dataItem, nodeIndex)}
            preventSwipe={['down']}
            {...rest}>
            <div className="flick-card-inner">
              <Component dataItem={dataItem} />
            </div>
          </TinderCard>
        );
      })}

      <div className="animation-container" data-ref="animation-container">
        {SwipeIconUp && <SwipeIconUp.type {...SwipeIconUp.props} data-ref="up" />}
        {SwipeIconDown && <SwipeIconDown.type {...SwipeIconDown.props} data-ref="down" />}
        {SwipeIconLeft && <SwipeIconLeft.type {...SwipeIconLeft.props} data-ref="left" />}
        {SwipeIconRight && <SwipeIconRight.type {...SwipeIconRight.props} data-ref="right" />}
      </div>
    </div>
  );
}
