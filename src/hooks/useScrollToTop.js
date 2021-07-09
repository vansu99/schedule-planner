import { useLayoutEffect } from 'react';

function useScrollToTop() {
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);
}

export default useScrollToTop;
