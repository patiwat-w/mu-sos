import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { userSessionService } from '../services/UserSessionService';

const ProtectedRoute: React.FC<any> = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        const user = userSessionService.getSession();
        if (!user) {
          return (
            <Redirect
              to={{
                pathname: '/login',
                state: { from: props.location },
              }}
            />
          );
        }
        return <Component {...props} />;
      }}
    />
  );
};

export default ProtectedRoute;