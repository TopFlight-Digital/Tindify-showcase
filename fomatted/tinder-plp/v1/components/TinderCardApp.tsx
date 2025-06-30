import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import TinderCards from './TinderCards';
import WishlistGrid from './WishlistGrid';
import ProductCardComponent from './ProductCardComponent';
import { ClearIcon, HeartIcon } from '../svg';

export interface TinderCardAppProps {
  productCards: HTMLElement[];
}

function TinderCardApp({ productCards }: TinderCardAppProps) {
  const [wishList, setWishList] = useState<HTMLElement[]>([]);
  const [tinderOpen, handleTinderOpen] = useState<boolean>(true);
  const [tinderLoader, setTinderLoader] = useState<boolean>(true);
  const [showWishlist, setShowWishlist] = useState<boolean>(false);

  const handleWishList = (item: HTMLElement) => {
    setWishList(prev => [...prev, item]);
  };

  useEffect(() => {
    setTimeout(() => {
      setTinderLoader(false);
    }, 5000);
  }, []);

  const handleBack = () => setShowWishlist(false);

  return tinderOpen ? (
    <div className="flick-wrapper">
      {tinderLoader ? (
        <section className="flick-loader">
          <h4>
            Identifying product tiles, and converting to swipable tinder cards &#40;This works most
            of the time&#41;.
          </h4>
          <div className="flick-loader-spinner"></div>
        </section>
      ) : showWishlist ? (
        <WishlistGrid items={wishList} onBack={handleBack} />
      ) : (
        <section>
          <div className="flick-header">
            <div
              className="flick-header-wishlist"
              style={{ position: 'relative' }}
              onClick={() => setShowWishlist(true)}>
              <HeartIcon hasWishListItems={wishList.length > 0} />
              {wishList.length > 0 && (
                <span className="flick-wishlist-indicator">{wishList.length}</span>
              )}
            </div>
            <div className="flick-header-close" onClick={() => handleTinderOpen(false)}>
              <ClearIcon />
            </div>
          </div>
          <TinderCards
            dataMap={productCards}
            onSwipeCallback={(direction: string, dataItem: HTMLElement) => {
              if (direction === 'right') {
                console.log('Yes');
                handleWishList(dataItem);
              }
              if (direction === 'left') {
                console.log('No');
              }
              if (direction === 'up') {
                console.log('up');
              }
            }}
            onEndCallback={() => {
              console.log('end of stack');
            }}
            Component={ProductCardComponent}
          />
        </section>
      )}
    </div>
  ) : null;
}

export default TinderCardApp;
