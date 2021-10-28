import React from 'react';
import { Route, Redirect, withRouter } from "react-router-dom";

export const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true,
      setTimeout(cb, 100)
  },
  signOut(cb) {
    this.isAuthenticated = false,
      localStorage.clear(),
      setTimeout(cb, 100)
  }
}

const ProtectedRoute = ({ component: Component, path, ...rest }) => {
  return (
    <Route
      path={path}
      {...rest}
      render={props =>
        fakeAuth.isAuthenticated ? (
          <Component {...props} {...rest} />
        ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: {
                  from: props.location
                }
              }}
            />
          )
      }
    />
  );
};
export default withRouter(ProtectedRoute);