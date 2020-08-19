// https://reactjs.org/docs/code-splitting.html

import React, { Suspense, lazy } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import UserContext from "../contexts/UserContext";

import ErrorBoundary from "../shared/components/ErrorBoundry";

// Public
const Login = lazy(() => import("../pages/Login"));
const SignUp = lazy(() => import("../pages/SignUp"));

const PrivateRoute = ({ component: Component, isLoggedIn, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        !isLoggedIn ? (
          <Redirect
            to={{
              pathname: "/login",
              state: { fromPathname: props.location.pathname }, // eslint-disable-line
            }}
          />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

class Routes extends React.PureComponent {
  // eslint-disable-next-line
  static contextType = UserContext;

  render() {
    const { isLoggedIn } = this.context;

    return (
      <ErrorBoundary>
        <Suspense fallback={<div />}>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/login" component={Login} />
            {/* <Route exact path="/sign-up" component={SignUp} /> */}
            <PrivateRoute
              exact
              path="/sign-up"
              component={SignUp}
              isLoggedIn={isLoggedIn()}
            />
          </Switch>
        </Suspense>
      </ErrorBoundary>
    );
  }
}

export default Routes;
