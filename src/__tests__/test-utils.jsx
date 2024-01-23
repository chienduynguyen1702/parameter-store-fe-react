import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { render, renderHook } from '@testing-library/react';

import { AuthProvider } from '../context/AuthContext';
import { UnderDevelopmentProvider } from '../context/UnderDevelopmentContext';

import { RequireAuth, DirectionalPage } from '../components';

import '../styles/app.sass';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 3,
    },
  },
});

const AllTheProviders = ({ children }) => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AuthProvider>
            <UnderDevelopmentProvider>
              <DirectionalPage>
                <RequireAuth redirectTo="/sign-in">{children}</RequireAuth>
              </DirectionalPage>
            </UnderDevelopmentProvider>
          </AuthProvider>
        </BrowserRouter>
      </QueryClientProvider>

      <ToastContainer autoClose={1000} />
    </>
  );
};

const customRender = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options });

const customRenderHook = (hook, options) =>
  renderHook(hook, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';

// override render method
export { customRender as render };
export { customRenderHook as renderHook };
