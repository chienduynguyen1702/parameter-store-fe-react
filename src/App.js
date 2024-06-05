import React, { lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import ReactTooltip from 'react-tooltip';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { AuthProvider } from './context/AuthContext';
import { UnderDevelopmentProvider } from './context/UnderDevelopmentContext';

import SuspenseContainer from './components/SuspenseContainer';
import RequireAuth from './components/RequireAuth';

import './styles/app.sass';
import { Page } from './components';

const PageContent = lazy(() => import('./components/PageContent'));

const HomePage = lazy(() => import('./screens/HomePage'));

const UsersAndSettingsPage = lazy(() => import('./screens/Users&Settings'));
const UsersPage = lazy(() => import('./screens/Users&Settings/Users'));
const RolesPage = lazy(() => import('./screens/Users&Settings/Roles'));

const ProjectsPage = lazy(() => import('./screens/Projects'));
const DashboardPage = lazy(() => import('./screens/DashboardPage'));

const ProjectDetailPage = lazy(() => import('./screens/ProjectDetail'));
const ProjectOverviewPage = lazy(() =>
  import('./screens/ProjectDetail/OverviewPage'),
);
const ProjectParametersPage = lazy(() =>
  import('./screens/ProjectDetail/ParametersPage'),
);
const ProjectTrackingPage = lazy(() =>
  import('./screens/ProjectDetail/TrackingPage'),
);
const ProjectAgentPage = lazy(() =>
  import('./screens/ProjectDetail/AgentPage'),
);

const DashboardHighLight = lazy(() =>
  import('./screens/ProjectDetail/Dashboard'),
);
const Workflows = lazy(() => import('./screens/ProjectDetail/Workflows'));
const SignIn = lazy(() => import('./screens/Authentication/SignIn'));
const SignUp = lazy(() => import('./screens/Authentication/SignUp'));
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
              <Routes>
                <Route exact path="/" element={<Navigate to="/projects" />} />
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
                    path="dashboard/*"
                    element={
                      <SuspenseContainer>
                        <PageContent title="Dashboard" wide>
                          <DashboardPage />
                        </PageContent>
                      </SuspenseContainer>
                    }
                  />
                  <Route
                    index
                    path="home/*"
                    element={
                      <SuspenseContainer>
                        <PageContent title="Home Page" wide>
                          <HomePage />
                        </PageContent>
                      </SuspenseContainer>
                    }
                  />
                  <Route
                    exact
                    path="projects/*"
                    element={
                      <SuspenseContainer>
                        <PageContent wide>
                          <ProjectsPage />
                        </PageContent>
                      </SuspenseContainer>
                    }
                  />
                  <Route
                    exact
                    path="project-detail/:id/*"
                    element={
                      <SuspenseContainer>
                        {/* <PageContent title="Project Detail" wide> */}
                        <ProjectDetailPage />
                        {/* </PageContent> */}
                      </SuspenseContainer>
                    }
                  >
                    <Route index element={<Navigate to="parameters" />} />
                    <Route path="workflows/*" element={<Workflows />} />
                    <Route
                      path="dashboard/*"
                      element={<DashboardHighLight />}
                    />
                    <Route
                      path="overview/*"
                      element={<ProjectOverviewPage />}
                    />
                    <Route
                      path="parameters/*"
                      element={<ProjectParametersPage />}
                    />
                    <Route path="agents/*" element={<ProjectAgentPage />} />
                    <Route
                      path="tracking/*"
                      element={<ProjectTrackingPage />}
                    />
                  </Route>
                  <Route
                    exact
                    path="user-setting/*"
                    element={
                      <SuspenseContainer>
                        <PageContent title="Users & Settings" wide>
                          <UsersAndSettingsPage />
                        </PageContent>
                      </SuspenseContainer>
                    }
                  >
                    <Route
                      index
                      element={<Navigate to="/user-setting/users" />}
                    />
                    <Route path="users/*" element={<UsersPage />}></Route>
                    <Route path="roles/*" element={<RolesPage />}></Route>
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
                  path="/sign-up"
                  element={
                    <SuspenseContainer isFullScreen>
                      <SignUp />
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
