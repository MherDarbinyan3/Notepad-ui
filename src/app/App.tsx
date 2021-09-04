import React, { Suspense } from 'react';
import { Routes } from '../navigation/Routes';

export const App: React.FunctionComponent = () => {
  return (
    <Suspense fallback={null}>
      <Routes />
    </Suspense>
  );
};
