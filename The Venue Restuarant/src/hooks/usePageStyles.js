import { useLayoutEffect } from 'react';

// The template ships a separate stylesheet per page and those sheets reuse the
// same class names. To keep that look in a single-page app we inject a page's
// CSS while it is mounted and remove it again when the user navigates away.
export default function usePageStyles(sheets) {
  useLayoutEffect(() => {
    const nodes = sheets.map((css) => {
      const el = document.createElement('style');
      el.setAttribute('data-page-style', '');
      el.textContent = css;
      document.head.appendChild(el);
      return el;
    });
    return () => nodes.forEach((el) => el.remove());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
