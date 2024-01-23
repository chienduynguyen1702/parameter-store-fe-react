import { useEffect } from 'react';

export default function ScrollToTop({ children }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  return <>{children}</>;
}
