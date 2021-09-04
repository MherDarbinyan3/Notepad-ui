import React from 'react';
import { Route, RouteProps } from 'react-router-dom';

interface CustomRouteProps extends RouteProps {
  name: string;
}

export const RouteWrapper: React.FC<CustomRouteProps> = ({ children, ...rest }) => {
  return <Route {...rest}>{children}</Route>;
};
