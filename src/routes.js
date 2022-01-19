import React from "react";
import { Route, Switch, Redirect, BrowserRouter } from "react-router-dom";


import initUser from './auth/initUser'
import Login  from "Pages/login";
import Users from "Pages/Users";
import Orders from 'Pages/Orders'
import Dashboard from "Pages/Dashboard"

const ROUTES = [
    { path: "/", key: "ROOT", exact: true, component: () => <h1>Home</h1> },
    { path: "/login", key: "login", exact: true, component: () => <Login /> },
    {
      path: "/dashboard",
      key: "APP",
      component: CheckAuth, // here's the update
      routes: [
        {
          path: "/dashboard",
          key: "APP_account",
          exact: true,
          component: () => <Dashboard />,
        },
        {
          path: "/dashboard/home",
          key: "APP_account",
          exact: true,
          component: () => <h1>Home</h1>,
        },
        {
          path: "/dashboard/users",
          key: "APP_account",
          exact: true,
          component: () => <Users />,
        },
        {
          path: "/dashboard/orders",
          key: "APP_account",
          exact: true,
          component: () => <Orders />,
        },
        {
          path: "/dashboard/logout",
          key: "APP_logout",
          exact: true,
          component: () => <h1>Logging out!</h1>,
        },
      ],
    },
  ];
  
  export default ROUTES;

  function  CheckAuth(props) {
    const { isUserLoggedIn } = initUser()
    const is_Auth = isUserLoggedIn()
    // const is_Auth = true
    console.log(is_Auth)

    if (!is_Auth) {
      return <Redirect to={"/login"} />;
    }
    return <RenderRoutes {...props} />
  }

  function RouteWithSubRoutes(route) {
    return (
      <Route
        path={route.path}
        exact={route.exact}
        render={props => <route.component {...props} routes={route.routes} />}
      />
    );
  }

  export function RenderRoutes({ routes }) {
    return (
      <Switch>
        {routes.map((route, i) => {
          return <RouteWithSubRoutes key={route.key} {...route} />;
        })}
        <Route component={() => <h1>Not Found!</h1>} />
      </Switch>
    );
  }