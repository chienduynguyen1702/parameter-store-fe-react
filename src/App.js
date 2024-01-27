import React, { lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { AuthProvider } from './context/AuthContext';
import { UnderDevelopmentProvider } from './context/UnderDevelopmentContext';

import SuspenseContainer from './components/SuspenseContainer';
import RequireAuth from './components/RequireAuth';
import DirectionalPage from './components/DirectionalPage';

import './styles/app.sass';
import { Page } from './components';
import ReactTooltip from 'react-tooltip';

const PageContent = lazy(() => import('./components/PageContent'));
const ScrollToTop = lazy(() => import('./components/ScrollToTop'));

const HomePage = lazy(() => import('./screens/HomePage'));

const UsersAndSettings = lazy(() => import('./screens/Users&Settings'));
const Users = lazy(() => import('./screens/Users&Settings/Users'));
const Roles = lazy(() => import('./screens/Users&Settings/Roles'));
const UserForm = lazy(() => import('./screens/Users&Settings/Users/UserForm'));
const RoleForm = lazy(() => import('./screens/Users&Settings/Roles/RoleForm'));

const SecretsPage = lazy(() => import('./screens/Secrets'));
const ProjectsPage = lazy(() => import('./screens/Projects'));

const SignIn = lazy(() => import('./screens/Authentication/SignIn'));
const ResetPassword = lazy(() =>
  import('./screens/Authentication/ResetPassword'),
);
const ForgotPassword = lazy(() =>
  import('./screens/Authentication/ForgotPassword'),
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 3,
    },
  },
});

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AuthProvider>
            <UnderDevelopmentProvider>
              <DirectionalPage>
                <Routes>
                  <Route
                    exact
                    path="/*"
                    element={
                      <RequireAuth redirectTo="/sign-in">
                        <Page />
                      </RequireAuth>
                    }
                  >
                    <Route
                      index
                      element={
                        <SuspenseContainer>
                          <PageContent wide>
                            <HomePage />
                          </PageContent>
                        </SuspenseContainer>
                      }
                    />
                    <Route
                      exact
                      path="secrets/*"
                      element={
                        <SuspenseContainer>
                          <PageContent title="Secrets" wide>
                            <SecretsPage />
                          </PageContent>
                        </SuspenseContainer>
                      }
                    />
                    <Route
                      exact
                      path="projects/*"
                      element={
                        <SuspenseContainer>
                          <PageContent title="Projects" wide>
                            <ProjectsPage />
                          </PageContent>
                        </SuspenseContainer>
                      }
                    />
                    <Route
                      exact
                      path="user-setting/*"
                      element={
                        <SuspenseContainer>
                          <PageContent title="Users & Settings" wide>
                            <UsersAndSettings />
                          </PageContent>
                        </SuspenseContainer>
                      }
                    >
                      <Route
                        index
                        element={<Navigate to="/user-setting/users" />}
                      />
                      <Route
                        path="users/*"
                        element={
                          <ScrollToTop>
                            <Users />
                          </ScrollToTop>
                        }
                      >
                        <Route
                          path="add-user"
                          element={
                            <SuspenseContainer>
                              <UserForm
                                title="Add user"
                                path="/user-setting/users/add-user"
                              />
                            </SuspenseContainer>
                          }
                        />
                        <Route
                          path="edit-user/:id"
                          element={
                            <SuspenseContainer>
                              <UserForm title="Edit user" />
                            </SuspenseContainer>
                          }
                        />
                      </Route>
                      <Route
                        path="roles/*"
                        element={
                          <ScrollToTop>
                            <Roles />
                          </ScrollToTop>
                        }
                      >
                        <Route
                          path="add-role"
                          element={
                            <SuspenseContainer>
                              <RoleForm />
                            </SuspenseContainer>
                          }
                        />
                        <Route
                          path="edit-role/:id"
                          element={
                            <SuspenseContainer>
                              <RoleForm />
                            </SuspenseContainer>
                          }
                        />
                      </Route>
                    </Route>
                  </Route>

                  {/* Authentication */}
                  <Route
                    exact
                    path="/sign-in"
                    element={
                      <SuspenseContainer isFullScreen>
                        <SignIn />
                      </SuspenseContainer>
                    }
                  />
                  <Route
                    exact
                    path="/reset-password"
                    element={
                      <SuspenseContainer isFullScreen>
                        <ResetPassword />
                      </SuspenseContainer>
                    }
                  />
                  <Route
                    exact
                    path="/forgot-password"
                    element={
                      <SuspenseContainer isFullScreen>
                        <ForgotPassword />
                      </SuspenseContainer>
                    }
                  />
                </Routes>
              </DirectionalPage>
            </UnderDevelopmentProvider>
          </AuthProvider>
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>

      <ToastContainer autoClose={1000} />
      <ReactTooltip />
    </>
  );
}

export default App;
