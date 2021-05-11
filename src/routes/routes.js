import React, { Fragment, lazy, Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Loading from "components/Loading";
import { pathName } from "configs";
import { AuthGuard, GuestGuard } from "guards";
import MainLayout from "layout/MainLayout";
import GuestLayout from "layout/GuestLayout";

const Error404View = lazy(() => import("components/404"));
const Login = lazy(() => import("features/Login"));
const Register = lazy(() => import("features/Register"));
const Todos = lazy(() => import("features/Todos"));
const Home = lazy(() => import("pages/Home"));
const UserProfile = lazy(() => import("pages/User/UserProfile"));
const UserEdit = lazy(() => import("pages/User/UserProfileEdit"));
const UserChangePassword = lazy(() => import("pages/User/ChangePassword"));
const TodoReport = lazy(() => import("pages/Report"));
const TimeTable = lazy(() => import("features/Calendar"));

const routesConfig = [
  {
    exact: true,
    guard: GuestGuard,
    path: pathName.LOGIN,
    layout: GuestLayout,
    component: Login
  },
  {
    exact: true,
    guard: GuestGuard,
    path: pathName.REGISTER,
    layout: GuestLayout,
    component: Register
  },
  {
    exact: true,
    path: pathName.ERROR_404,
    component: Error404View
  },
  {
    path: "/",
    guard: AuthGuard,
    layout: MainLayout,
    routes: [
      {
        exact: true,
        path: pathName.ROOT,
        component: Home
      },
      {
        exact: true,
        path: pathName.USER_CHANGE_PASSWORD,
        component: UserChangePassword
      },
      {
        exact: true,
        path: pathName.USER_EDIT,
        component: UserEdit
      },
      {
        exact: true,
        path: pathName.USER_DETAIL,
        component: UserProfile
      },
      {
        exact: true,
        path: pathName.TODO_CALENDAR,
        component: TimeTable
      },
      {
        exact: true,
        path: pathName.TODO_LIST,
        component: Todos
      },
      {
        exact: true,
        path: pathName.USER_REPORT,
        component: TodoReport
      },
      {
        exact: true,
        path: pathName.ERROR_404,
        component: Error404View
      },
      {
        component: () => <Redirect to={pathName.ERROR_404} />
      }
    ]
  },
  {
    path: "*",
    routes: [
      {
        component: () => <Redirect to={pathName.ERROR_404} />
      }
    ]
  }
];

const renderRoutes = routes => {
  return (
    <>
      {routes ? (
        <Suspense fallback={<Loading />}>
          <Switch>
            {routes.map((route, idx) => {
              const Guard = route.guard || Fragment;
              const Component = route.component;
              const Layout = route.layout || Fragment;

              return (
                <Route
                  key={`routes-${idx}`}
                  path={route.path}
                  exact={route.exact}
                  render={props => (
                    <Guard>
                      <Layout>{route.routes ? renderRoutes(route.routes) : <Component {...props} />}</Layout>
                    </Guard>
                  )}
                />
              );
            })}
          </Switch>
        </Suspense>
      ) : null}
    </>
  );
};

function routes() {
  return renderRoutes(routesConfig);
}

export default routes;
