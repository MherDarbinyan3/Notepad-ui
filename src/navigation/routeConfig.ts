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

const Home = React.lazy(() => import('../routes/home/Home'));

export const routeConfig: Routes = {
  home: {
    path: '/',
    name: 'Home',
    exact: true,
    component: Home,
  },
};

export const getRoutes = (): Route[] => {
  const paths: Route[] = [];

  Object.keys(routeConfig).forEach(key => paths.push(routeConfig[key]));

  return paths;
}
