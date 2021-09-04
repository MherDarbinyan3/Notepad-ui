import React from 'react';
import { Switch } from 'react-router-dom';

import { RouteWrapper } from './RouteWrapper';
import { getRoutes } from './routeConfig';
import { NotFound } from '../routes/notFound/NotFound';
import { AppLayout } from '../components/layout/AppLayout/AppLayout';

export const RouteSwitcher = () => (
  <AppLayout>
    <Switch>
      {getRoutes().map((route, idx) => (
        <RouteWrapper
          key={idx}
          path={route.path}
          exact={route.exact}
          name={route.name}
          render={(props: any) => (
            <div>
              <route.component {...props} />
            </div>
          )}
        />
      ))}
      <NotFound />
    </Switch>
  </AppLayout>
);
