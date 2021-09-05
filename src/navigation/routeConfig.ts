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
const NewNotepad = React.lazy(() => import('../routes/notepad/newNotepad/NewNotepad'));
const EditNotepad = React.lazy(() => import('../routes/notepad/editNotepad/EditNotepad'));

export const routeConfig: Routes = {
  notepad: {
    path: '/',
    name: 'Notepads',
    exact: true,
    component: Notepads,
  },
  newNotepad: {
    path: '/new',
    name: 'New',
    exact: true,
    component: NewNotepad,
  },
  editNotepad: {
    path: '/:id',
    name: 'Edit',
    exact: true,
    component: EditNotepad,
  },
};

export const getRoutes = (): Route[] => {
  const paths: Route[] = [];

  Object.keys(routeConfig).forEach(key => paths.push(routeConfig[key]));

  return paths;
}
