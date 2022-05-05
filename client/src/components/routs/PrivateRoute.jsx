import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';

// eslint-disable-next-line react/prop-types
export function PrivateRoute({ children }) {
  const { id } = useSelector((state) => state.login);
  ///check authorization data
  return !!id ? children : <Navigate to="/" />;
}
