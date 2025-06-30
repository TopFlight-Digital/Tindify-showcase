export const getProductTiles = (): HTMLElement[] => {
  const MIN_REPETITIONS = 8;
  const MAX_DEPTH = 20;
  const candidates: HTMLElement[] = [];

  const isPriceLike = (text: string): boolean => {
    return /[$£€¥]\s?\d{1,5}(?:[\.,]\d{2})?/.test(text);
  };

  const containsPrice = (el: HTMLElement): boolean => {
    return isPriceLike(el.innerText || '');
  };

  const hasValidHeight = (el: HTMLElement): boolean => {
    return el.offsetHeight > 200;
  };

  const getSimilarCount = (el: HTMLElement): number => {
    const classSelector = Array.from(el.classList)
      .map((c: string) => '.' + CSS.escape(c))
      .join('');
    const selector = el.tagName.toLowerCase() + classSelector;

    try {
      return document.querySelectorAll(selector).length;
    } catch (e) {
      console.warn('Invalid selector:', selector);
      return 0;
    }
  };

  const images: HTMLImageElement[] = Array.from(document.querySelectorAll('img'));

  images.forEach((img: HTMLImageElement) => {
    let current: HTMLElement = img;
    let bestMatch: HTMLElement | null = null;

    for (let i = 0; i < MAX_DEPTH && current.parentElement; i++) {
      current = current.parentElement;

      const similarCount = getSimilarCount(current);
      const hasPrice = containsPrice(current);
      const validHeight = hasValidHeight(current);

      if (similarCount >= MIN_REPETITIONS && hasPrice && validHeight) {
        bestMatch = current;
      } else if (bestMatch) {
        candidates.push(bestMatch);
        break;
      }
    }

    if (bestMatch) {
      candidates.push(bestMatch);
    }
  });

  const uniqueCandidates: HTMLElement[] = Array.from(new Set(candidates));

  const finalTiles = uniqueCandidates.filter(
    (el: HTMLElement) =>
      !uniqueCandidates.some((other: HTMLElement) => el !== other && el.contains(other))
  );

  const getSignature = (el: HTMLElement): string => {
    return el.tagName.toLowerCase() + '::' + Array.from(el.classList).sort().join('.');
  };

  const signatureCounts: { [key: string]: number } = {};
  finalTiles.forEach((el: HTMLElement) => {
    const sig = getSignature(el);
    signatureCounts[sig] = (signatureCounts[sig] || 0) + 1;
  });

  const [mostCommonSignature] =
    Object.entries(signatureCounts)?.sort((a, b) => b[1] - a[1])[0] || [];

  const filteredTiles = finalTiles.filter(el => getSignature(el) === mostCommonSignature);

  if (filteredTiles.length < 5) return [];

  return filteredTiles;
};
