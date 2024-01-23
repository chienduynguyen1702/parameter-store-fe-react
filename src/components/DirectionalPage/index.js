import React, { useCallback, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';

function DirectionalPage({ children }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleGoBack = useCallback(() => {
    if (sessionStorage.getItem('preUrl')) {
      const arr_url = sessionStorage.getItem('preUrl').split(',');
      arr_url.pop();

      sessionStorage.setItem('preUrl', arr_url);
      const pre_url = arr_url[arr_url.length - 1];
      if (pre_url) {
        setTimeout(() => navigate(pre_url), 1);
      }
      return;
    }
  }, [navigate]);

  useEffect(() => {
    window.addEventListener('popstate', handleGoBack);
    return () => {
      window.removeEventListener('popstate', handleGoBack);
    };
  }, [handleGoBack]);

  useEffect(() => {
    if (
      sessionStorage.getItem('preUrl') &&
      location.pathname ===
        sessionStorage.getItem('preUrl').split(',')[
          sessionStorage.getItem('preUrl')?.split(',')?.length - 1
        ]
    ) {
      return;
    }
    const arr_url = [];
    const history = sessionStorage.getItem('preUrl')
      ? sessionStorage.getItem('preUrl')?.split(',')
      : [''];
    history.push(location.pathname);
    arr_url.push(history);
    sessionStorage.setItem('preUrl', arr_url);
  }, [location.pathname]);

  return <>{children}</>;
}

export default DirectionalPage;
