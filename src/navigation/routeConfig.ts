import React from 'react';

interface Route {
  path: string;
  name: string;
  exact?: boolean;
  component: React.LazyExoticComponent<React.ComponentType<any>>;
}

interface Routes {
  [key: string]: Route;
}

const Notepads = React.lazy(() => import('../routes/notepad/Notepads'));

export const routeConfig: Routes = {
  home: {
    path: '/',
    name: 'Notepads',
    exact: true,
    component: Notepads,
  },
};

export const getRoutes = (): Route[] => {
  const paths: Route[] = [];

  Object.keys(routeConfig).forEach(key => paths.push(routeConfig[key]));

  return paths;
}
