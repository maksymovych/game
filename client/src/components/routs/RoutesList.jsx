import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Error from '../pages/Error/Error';
import { routes } from '../../config/routs';
import { PrivateRoute } from './PrivateRoute';

function RoutesList() {
  return (
    <Routes>
      {routes.map(({ element: Component, path, isPrivate }, index) => {
        if (isPrivate) {
          return (
            <Route
              key={index}
              path={path}
              element={
                <PrivateRoute>
                  <Component />
                </PrivateRoute>
              }
            />
          );
        } else {
          return <Route key={index} path={path} element={<Component />} />;
        }
      })}
      <Route path="*" element={<Error />} />
    </Routes>
  );
}

export default RoutesList;
