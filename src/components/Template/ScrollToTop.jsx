import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Scrolls to the top on navigation, or to the #anchor when the URL has one.
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const target = hash ? document.getElementById(hash.slice(1)) : null;
    if (target) {
      target.scrollIntoView();
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;
