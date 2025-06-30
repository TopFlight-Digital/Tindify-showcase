import { h } from 'preact';
import ProductCardComponent, { ProductCardComponentProps } from './ProductCardComponent';

export interface WishlistGridProps {
  items: HTMLElement[];
  onBack: () => void;
}

function WishlistGrid({ items, onBack }: WishlistGridProps) {
  return (
    <div className="wishlist-grid">
      <h4>Wishlist Items</h4>
      <div className="wishlist-grid-container">
        {items.map((item, idx) => (
          <div key={idx} className="wishlist-grid-item">
            <ProductCardComponent dataItem={item} />
          </div>
        ))}
      </div>
      <button className="wishlist-back-btn" onClick={onBack}>
        Back to Cards
      </button>
    </div>
  );
}

export default WishlistGrid;
