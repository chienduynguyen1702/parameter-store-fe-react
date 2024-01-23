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

const HomePage = lazy(() => import('./screens/HomePage'));
const PolicyPage = lazy(() => import('./screens/PolicyPage'));
const PageContent = lazy(() => import('./components/PageContent'));
const ScrollToTop = lazy(() => import('./components/ScrollToTop'));
const UsersAndSettings = lazy(() => import('./screens/Users&Settings'));
const Users = lazy(() => import('./screens/Users&Settings/Users'));
const Roles = lazy(() => import('./screens/Users&Settings/Roles'));
const UserForm = lazy(() => import('./screens/Users&Settings/Users/UserForm'));
const RoleForm = lazy(() => import('./screens/Users&Settings/Roles/RoleForm'));
const KOCs = lazy(() => import('./screens/KOCs'));
const KOCSettingsForm = lazy(() => import('./screens/KOCs/KOCSettingsForm'));
const TaskCalendarView = lazy(() => import('./screens/Task/CalendarView'));
const TaskForm = lazy(() => import('./screens/Task/components/TaskForm'));
const ViewTask = lazy(() => import('./screens/Task/components/ViewTask'));
const TaskSettingsForm = lazy(() =>
  import('./screens/Task/components/TaskSettingsForm'),
);
const EvidenceForm = lazy(() =>
  import('./screens/Task/TableView/EvidenceForm'),
);

const PamperingEvidenceForm = lazy(() =>
  import('./screens/Pampering/components/EvidenceForm'),
);
const TableView = lazy(() => import('./screens/Task/TableView'));
const ContentTikTok = lazy(() => import('./screens/Contents/ContentTikTok'));
const ContentFacebook = lazy(() =>
  import('./screens/Contents/ContentFacebook'),
);
const ContentYoutube = lazy(() => import('./screens/Contents/ContentYoutube'));
const ContentInstagram = lazy(() =>
  import('./screens/Contents/ContentInstagram'),
);
const OtherContent = lazy(() => import('./screens/Contents/OtherContent'));

// const KOCProfile = lazy(() => import('./screens/KOCs/KOCProfile'));
// const KOCTiktok = lazy(() =>
//   import('./screens/KOCs/KOCProfile/screens/KOCTiktok'),
// );
// const KOCOverview = lazy(() =>
//   import('./screens/KOCs/KOCProfile/screens/KOCOverview'),
// );
// const KOCYoutube = lazy(() =>
//   import('./screens/KOCs/KOCProfile/screens/KOCYoutube'),
// );
// const KOCFacebook = lazy(() =>
//   import('./screens/KOCs/KOCProfile/screens/KOCFacebook'),
// );
// const KOCInstagram = lazy(() =>
//   import('./screens/KOCs/KOCProfile/screens/KOCInstagram'),
// );
// const KOCOtherContent = lazy(() =>
//   import('./screens/KOCs/KOCProfile/screens/KOCOtherContent'),
// );
// const KOCProductSold = lazy(() =>
//   import('./screens/KOCs/KOCProfile/screens/KOCProductSold'),
// );

const Order = lazy(() => import('./screens/Orders'));
const OrderDetail = lazy(() => import('./screens/Orders/OrderDetail'));
const ImportOrder = lazy(() => import('./screens/Orders/ImportOrder'));
const Products = lazy(() => import('./screens/Products'));
const ProductSettingsForm = lazy(() =>
  import('./screens/Products/ProductSettingsForm'),
);
const ImportProduct = lazy(() => import('./screens/Products/ImportProduct'));
const ImportPampering = lazy(() =>
  import('./screens/Pampering/TableView/ImportPampering'),
);

const ProductDetail = lazy(() => import('./screens/Products/ProductDetail'));
const ProDetailOverview = lazy(() =>
  import('./screens/Products/ProductDetail/Overview'),
);
const ProDetailTikTok = lazy(() =>
  import('./screens/Products/ProductDetail/TikTok'),
);
const ProDetailYoutube = lazy(() =>
  import('./screens/Products/ProductDetail/Youtube'),
);
const ProDetailFacebook = lazy(() =>
  import('./screens/Products/ProductDetail/Facebook'),
);
const ProDetailInstagram = lazy(() =>
  import('./screens/Products/ProductDetail/Instagram'),
);
const ProDetailKOCs = lazy(() =>
  import('./screens/Products/ProductDetail/KOCs'),
);
const ProDetailContentTimeline = lazy(() =>
  import('./screens/Products/ProductDetail/ContentTimeline'),
);
const ProDetailOrder = lazy(() =>
  import('./screens/Products/ProductDetail/Order'),
);

const DashboardKOCs = lazy(() => import('./screens/Dashboard/DashboardKOCs'));
const DashboardContents = lazy(() =>
  import('./screens/Dashboard/DashboardContents'),
);
const DashboardOrders = lazy(() =>
  import('./screens/Dashboard/DashboardOrders'),
);
const DashboardProducts = lazy(() =>
  import('./screens/Dashboard/DashboardProducts'),
);
const DashboardHighLight = lazy(() =>
  import('./screens/Dashboard/DashboardHighLight'),
);
const Liquidation = lazy(() => import('./screens/Liquidation'));
const ImportLiquidation = lazy(() =>
  import('./screens/Liquidation/ImportLiquidation'),
);
const LiquidationSettingsForms = lazy(() =>
  import('./screens/Liquidation/LiquidationSettingsForms'),
);
const LiquidationForm = lazy(() =>
  import('./screens/Liquidation/LiquidationForm'),
);

const LiquidationFile = lazy(() => import('./screens/LiquidationFile'));
const LiquidationFileSettingsForms = lazy(() =>
  import('./screens/LiquidationFile/LiquidationFileSettingsForms'),
);
const LiquidationFileForm = lazy(() =>
  import('./screens/LiquidationFile/LiquidationFileForm'),
);

const PamperingCalendarView = lazy(() =>
  import('./screens/Pampering/CalendarView'),
);
const PamperingTableView = lazy(() => import('./screens/Pampering/TableView'));
const PamperingForm = lazy(() =>
  import('./screens/Pampering/components/PamperingForm'),
);
const PamperingSettingsForm = lazy(() =>
  import('./screens/Pampering/components/PamperingSettingsForm'),
);

const SignIn = lazy(() => import('./screens/SignIn'));
const ResetPassword = lazy(() => import('./screens/ResetPassword'));
const ForgotPassword = lazy(() => import('./screens/ForgotPassword'));

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

                    {/* KOCs */}
                    <Route
                      exact
                      path="kocs/*"
                      element={
                        <SuspenseContainer>
                          <ScrollToTop>
                            <PageContent title="KOCs" wide>
                              <KOCs />
                            </PageContent>
                          </ScrollToTop>
                        </SuspenseContainer>
                      }
                    >
                      <Route
                        path="add-koc"
                        element={
                          <SuspenseContainer>
                            <UserForm title="Add KOC" path="/kocs/add-koc" />
                          </SuspenseContainer>
                        }
                      />
                      <Route
                        path="edit-koc/:id"
                        element={
                          <SuspenseContainer>
                            <UserForm title="Edit KOC" />
                          </SuspenseContainer>
                        }
                      />
                      <Route
                        path="settings"
                        element={
                          <SuspenseContainer>
                            <KOCSettingsForm />
                          </SuspenseContainer>
                        }
                      />
                    </Route>

                    {/* KOC profile */}
                    {/* <Route
                      exact
                      path="koc-profile/:id/*"
                      element={
                        <SuspenseContainer>
                          <ScrollToTop>
                            <PageContent wide>
                              <KOCProfile />
                            </PageContent>
                          </ScrollToTop>
                        </SuspenseContainer>
                      }
                    >
                      <Route index element={<Navigate to="over-view" />} />
                      <Route
                        path="over-view"
                        element={
                          <SuspenseContainer>
                            <KOCOverview />
                          </SuspenseContainer>
                        }
                      />
                      <Route
                        path="tiktok"
                        element={
                          <SuspenseContainer>
                            <KOCTiktok />
                          </SuspenseContainer>
                        }
                      />
                      <Route
                        path="youtube"
                        element={
                          <SuspenseContainer>
                            <KOCYoutube />
                          </SuspenseContainer>
                        }
                      />
                      <Route
                        path="facebook"
                        element={
                          <SuspenseContainer>
                            <KOCFacebook />
                          </SuspenseContainer>
                        }
                      />
                      <Route
                        path="instagram"
                        element={
                          <SuspenseContainer>
                            <KOCInstagram />
                          </SuspenseContainer>
                        }
                      />
                      <Route
                        path="product-sold"
                        element={
                          <SuspenseContainer>
                            <KOCProductSold />
                          </SuspenseContainer>
                        }
                      />
                      <Route
                        path="other-content"
                        element={
                          <SuspenseContainer>
                            <KOCOtherContent />
                          </SuspenseContainer>
                        }
                      /> 
                    </Route>*/}

                    {/* Content */}
                    <Route
                      exact
                      path="content/tiktok"
                      element={
                        <SuspenseContainer>
                          <ScrollToTop>
                            <PageContent wide>
                              <ContentTikTok />
                            </PageContent>
                          </ScrollToTop>
                        </SuspenseContainer>
                      }
                    />
                    <Route
                      exact
                      path="content/facebook"
                      element={
                        <SuspenseContainer>
                          <ScrollToTop>
                            <PageContent title="Facebook" wide>
                              <ContentFacebook />
                            </PageContent>
                          </ScrollToTop>
                        </SuspenseContainer>
                      }
                    />
                    <Route
                      exact
                      path="content/youtube"
                      element={
                        <SuspenseContainer>
                          <ScrollToTop>
                            <PageContent title="Youtube" wide>
                              <ContentYoutube />
                            </PageContent>
                          </ScrollToTop>
                        </SuspenseContainer>
                      }
                    />
                    <Route
                      exact
                      path="content/other-contents"
                      element={
                        <SuspenseContainer>
                          <ScrollToTop>
                            <PageContent title="Other Contents" wide>
                              <OtherContent />
                            </PageContent>
                          </ScrollToTop>
                        </SuspenseContainer>
                      }
                    />
                    <Route
                      exact
                      path="content/instagram"
                      element={
                        <SuspenseContainer>
                          <ScrollToTop>
                            <PageContent title="Instagram" wide>
                              <ContentInstagram />
                            </PageContent>
                          </ScrollToTop>
                        </SuspenseContainer>
                      }
                    />
                    {/* Product */}
                    <Route
                      exact 
                      path="products/*"
                      element={
                        <SuspenseContainer>
                          <ScrollToTop>
                            <PageContent title="Product List" wide>
                              <Products />
                            </PageContent>
                          </ScrollToTop>
                        </SuspenseContainer>
                      }
                    >
                      <Route
                        path="settings"
                        element={
                          <SuspenseContainer>
                            <ProductSettingsForm />
                          </SuspenseContainer>
                        }
                      />
                      <Route
                        path="import/:id"
                        element={
                          <SuspenseContainer>
                            <ImportProduct />
                          </SuspenseContainer>
                        }
                      />
                    </Route>
                    {/* Product detail */}
                    <Route
                      path="product-detail/:id/*"
                      element={
                        <SuspenseContainer>
                          <ScrollToTop>
                            <ProductDetail />
                          </ScrollToTop>
                        </SuspenseContainer>
                      }
                    >
                      <Route index element={<Navigate to="overview" />} />
                      <Route
                        path="overview"
                        element={
                          <SuspenseContainer>
                            <ProDetailOverview />
                          </SuspenseContainer>
                        }
                      />
                      <Route
                        path="tiktok"
                        element={
                          <SuspenseContainer>
                            <ProDetailTikTok />
                          </SuspenseContainer>
                        }
                      />
                      <Route
                        path="youtube"
                        element={
                          <SuspenseContainer>
                            <ProDetailYoutube />
                          </SuspenseContainer>
                        }
                      />
                      <Route
                        path="facebook"
                        element={
                          <SuspenseContainer>
                            <ProDetailFacebook />
                          </SuspenseContainer>
                        }
                      />
                      <Route
                        path="instagram"
                        element={
                          <SuspenseContainer>
                            <ProDetailInstagram />
                          </SuspenseContainer>
                        }
                      />
                      <Route
                        path="kocs"
                        element={
                          <SuspenseContainer>
                            <ProDetailKOCs />
                          </SuspenseContainer>
                        }
                      />
                      <Route
                        path="content-timeline"
                        element={
                          <SuspenseContainer>
                            <ProDetailContentTimeline />
                          </SuspenseContainer>
                        }
                      />
                      <Route
                        path="order"
                        element={
                          <SuspenseContainer>
                            <ProDetailOrder />
                          </SuspenseContainer>
                        }
                      />
                    </Route>
                    {/* Calendar  */}
                    <Route
                      exact
                      path="tasks/calendar-view/*"
                      element={
                        <SuspenseContainer>
                          <ScrollToTop>
                            <PageContent title="Task Calendar" wide>
                              <TaskCalendarView />
                            </PageContent>
                          </ScrollToTop>
                        </SuspenseContainer>
                      }
                    >
                      <Route
                        path="add-task"
                        element={
                          <SuspenseContainer>
                            <TaskForm
                              title="Add Task"
                              path="/tasks/calendar-view/add-task"
                            />
                          </SuspenseContainer>
                        }
                      />
                      <Route
                        path="edit-task/:id"
                        element={
                          <SuspenseContainer>
                            <TaskForm title="Edit Task" />
                          </SuspenseContainer>
                        }
                      />
                      <Route
                        path="settings"
                        element={
                          <SuspenseContainer>
                            <TaskSettingsForm />
                          </SuspenseContainer>
                        }
                      />
                    </Route>
                    {/* Table Calendar  */}
                    <Route
                      exact
                      path="tasks/table-view/*"
                      element={
                        <SuspenseContainer>
                          <ScrollToTop>
                            <PageContent title="Task Table" wide>
                              <TableView />
                            </PageContent>
                          </ScrollToTop>
                        </SuspenseContainer>
                      }
                    >
                      <Route
                        path="add-task"
                        element={
                          <SuspenseContainer>
                            <TaskForm
                              title="Add Task"
                              path="/tasks/table-view/add-task"
                            />
                          </SuspenseContainer>
                        }
                      />
                      <Route
                        path="edit-task/:id"
                        element={
                          <SuspenseContainer>
                            <TaskForm title="Edit Task" />
                          </SuspenseContainer>
                        }
                      />
                      <Route
                        path="view-task/:id"
                        element={
                          <SuspenseContainer>
                            <ViewTask title="View Task" />
                          </SuspenseContainer>
                        }
                      />
                      <Route
                        path="select-evidence/:id"
                        element={
                          <SuspenseContainer>
                            <EvidenceForm />
                          </SuspenseContainer>
                        }
                      />
                      <Route
                        path="settings"
                        element={
                          <SuspenseContainer>
                            <TaskSettingsForm />
                          </SuspenseContainer>
                        }
                      />
                    </Route>

                    {/* Order */}
                    <Route
                      exact
                      path="orders/*"
                      element={
                        <SuspenseContainer>
                          <ScrollToTop>
                            <PageContent title="Total Order" wide>
                              <Order />
                            </PageContent>
                          </ScrollToTop>
                        </SuspenseContainer>
                      }
                    >
                      <Route
                        path="import"
                        element={
                          <SuspenseContainer>
                            <ImportOrder />
                          </SuspenseContainer>
                        }
                      />
                    </Route>

                    {/* Order detail */}
                    <Route
                      path="order-detail/:id"
                      element={
                        <SuspenseContainer>
                          <ScrollToTop>
                            <PageContent title="Order detail" wide>
                              <OrderDetail />
                            </PageContent>
                          </ScrollToTop>
                        </SuspenseContainer>
                      }
                    />
                    {/*Dashboard */}
                    <Route
                      exact
                      path="dashboard/kocs"
                      element={
                        <SuspenseContainer>
                          <ScrollToTop>
                            <DashboardKOCs />
                          </ScrollToTop>
                        </SuspenseContainer>
                      }
                    />
                    <Route
                      exact
                      path="dashboard/contents"
                      element={
                        <SuspenseContainer>
                          <ScrollToTop>
                            <DashboardContents />
                          </ScrollToTop>
                        </SuspenseContainer>
                      }
                    />
                    <Route
                      exact
                      path="dashboard/orders"
                      element={
                        <SuspenseContainer>
                          <ScrollToTop>
                            <DashboardOrders />
                          </ScrollToTop>
                        </SuspenseContainer>
                      }
                    />
                    <Route
                      exact
                      path="dashboard/products"
                      element={
                        <SuspenseContainer>
                          <ScrollToTop>
                            <DashboardProducts />
                          </ScrollToTop>
                        </SuspenseContainer>
                      }
                    />
                    <Route
                      exact
                      path="dashboard/highlight"
                      element={
                        <SuspenseContainer>
                          <ScrollToTop>
                            <DashboardHighLight />
                          </ScrollToTop>
                        </SuspenseContainer>
                      }
                    />

                    {/* Liquidation */}
                    <Route
                      exact
                      path="liquidation/*"
                      element={
                        <SuspenseContainer>
                          <ScrollToTop>
                            <PageContent title="Liquidation List" wide>
                              <Liquidation />
                            </PageContent>
                          </ScrollToTop>
                        </SuspenseContainer>
                      }
                    >
                      <Route
                        path="add-liquidation"
                        element={
                          <SuspenseContainer>
                            <LiquidationForm title="Add liquidation" />
                          </SuspenseContainer>
                        }
                      />
                      <Route
                        path="edit-liquidation/:id"
                        element={
                          <SuspenseContainer>
                            <LiquidationForm title="Edit liquidation" />
                          </SuspenseContainer>
                        }
                      />
                      <Route
                        path="import/:id"
                        element={
                          <SuspenseContainer>
                            <ImportLiquidation />
                          </SuspenseContainer>
                        }
                      />
                      <Route
                        path="settings"
                        element={
                          <SuspenseContainer>
                            <LiquidationSettingsForms />
                          </SuspenseContainer>
                        }
                      />
                    </Route>

                    {/* Liquidation file */}
                    <Route
                      path="liquidation-file"
                      element={
                        <SuspenseContainer>
                          <PageContent title="Liquidation File" wide>
                            <ScrollToTop>
                              <LiquidationFile />
                            </ScrollToTop>
                          </PageContent>
                        </SuspenseContainer>
                      }
                    >
                      <Route
                        path="add-liquidation-item"
                        element={
                          <SuspenseContainer>
                            <LiquidationFileForm title="Add liquidation Item" />
                          </SuspenseContainer>
                        }
                      />
                      <Route
                        path="edit-liquidation-item/:id"
                        element={
                          <SuspenseContainer>
                            <LiquidationFileForm title="Edit liquidation Item" />
                          </SuspenseContainer>
                        }
                      />
                      <Route
                        path="view-liquidation-item/:id"
                        element={
                          <SuspenseContainer>
                            <LiquidationFileForm
                              title="View liquidation Item"
                              disabled
                            />
                          </SuspenseContainer>
                        }
                      />
                      <Route
                        path="settings"
                        element={
                          <SuspenseContainer>
                            <LiquidationFileSettingsForms />
                          </SuspenseContainer>
                        }
                      />
                      <Route
                        path="edit-liquidation-file/:id"
                        element={
                          <SuspenseContainer>
                            <LiquidationForm title="Edit liquidation File" />
                          </SuspenseContainer>
                        }
                      />
                    </Route>

                    {/* Pampering */}
                    <Route
                      exact
                      path="pamperings/calendar-view/*"
                      element={
                        <SuspenseContainer>
                          <ScrollToTop>
                            <PageContent title="Pampering Calendar" wide>
                              <PamperingCalendarView />
                            </PageContent>
                          </ScrollToTop>
                        </SuspenseContainer>
                      }
                    >
                      <Route
                        path="add-pampering"
                        element={
                          <SuspenseContainer>
                            <PamperingForm
                              title="Add Pampering"
                              path="/pamperings/calendar-view/add-pampering"
                            />
                          </SuspenseContainer>
                        }
                      />
                      <Route
                        path="edit-pampering/:id"
                        element={
                          <SuspenseContainer>
                            <PamperingForm title="Edit Pampering" />
                          </SuspenseContainer>
                        }
                      />
                      <Route
                        path="settings"
                        element={
                          <SuspenseContainer>
                            <PamperingSettingsForm />
                          </SuspenseContainer>
                        }
                      />
                    </Route>

                    <Route
                      exact
                      path="pamperings/table-view/*"
                      element={
                        <SuspenseContainer>
                          <ScrollToTop>
                            <PageContent title="Pampering list" wide>
                              <PamperingTableView />
                            </PageContent>
                          </ScrollToTop>
                        </SuspenseContainer>
                      }
                    >
                      <Route
                        path="add-pampering"
                        element={
                          <SuspenseContainer>
                            <PamperingForm
                              title="Add Pampering"
                              path="/pamperings/table-view/add-pampering"
                            />
                          </SuspenseContainer>
                        }
                      />
                      <Route
                        path="edit-pampering/:id"
                        element={
                          <SuspenseContainer>
                            <PamperingForm title="Edit Pampering" />
                          </SuspenseContainer>
                        }
                      />
                      <Route
                        path="settings"
                        element={
                          <SuspenseContainer>
                            <PamperingSettingsForm />
                          </SuspenseContainer>
                        }
                      />
                      <Route
                        path="select-evidence/:id"
                        element={
                          <SuspenseContainer>
                            <PamperingEvidenceForm />
                          </SuspenseContainer>
                        }
                      />
                      <Route
                        path="import/:id"
                        element={
                          <SuspenseContainer>
                            <ImportPampering />
                          </SuspenseContainer>
                        }
                      />
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
                  <Route
                    exact
                    path="/policy"
                    element={
                      <SuspenseContainer isFullScreen>
                        <PolicyPage />
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
