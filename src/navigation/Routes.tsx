import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { RouteSwitcher } from './RouteSwitcher';

export const Routes = () => {
  return (
    <Router>
      <RouteSwitcher />
    </Router>
  );
};
