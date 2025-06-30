import settings from './settings';
import domGet from '@utils/dom/domGet';
import { render } from 'preact';
import { getProductTiles } from './helper';
import TinderCardApp from './components/TinderCardApp';

function startExperiment() {
  const { name, variation } = settings;
  const expVariantName = `${name}-variation-${variation}`;

  const addBodyClass = (className?: string) => {
    const body = document.body;
    body.classList.add(!className ? expVariantName : className);
  };

  const productCards = getProductTiles();

  if (!productCards.length) {
    return;
  }

  const insertPreactApp = () => {
    (document.body as any).firstElementChild.insertAdjacentHTML(
      'beforebegin',
      `<div class="flick-root"></div>`
    );

    render(<TinderCardApp productCards={productCards} />, domGet('.flick-root') as HTMLElement);
  };

  const initComponents = () => {
    insertPreactApp();
  };

  const start = () => {
    setTimeout(() => {
      addBodyClass();
      initComponents();
    }, 500);
  };

  start();
}

export default startExperiment;
