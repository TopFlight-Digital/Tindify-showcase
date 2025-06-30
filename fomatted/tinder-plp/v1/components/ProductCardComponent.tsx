import { h } from 'preact';
import { useEffect, useRef } from 'preact/hooks';

export interface ProductCardComponentProps {
  dataItem: HTMLElement;
}

function ProductCardComponent({ dataItem }: ProductCardComponentProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (wrapperRef.current && dataItem) {
      wrapperRef.current.innerHTML = '';
      wrapperRef.current.innerHTML = dataItem.outerHTML;
    }
  }, [dataItem]);

  return <div className="flick-card-react-ref" ref={wrapperRef}></div>;
}

export default ProductCardComponent;
