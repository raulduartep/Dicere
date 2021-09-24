import { useAuth } from 'hooks/useAuth';
import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';

export const PrivateRoute: React.FC<RouteProps> = ({
  component: Component,
  children,
  ...rest
}) => {
  const { isSigned } = useAuth();

  return (
    <Route
      render={props =>
        isSigned ? (
          Component ? (
            <Component {...props} />
          ) : (
            children
          )
        ) : (
          <Redirect
            to={{
              pathname: '/',
              state: { from: props.location },
            }}
          />
        )
      }
      {...rest}
    />
  );
};
