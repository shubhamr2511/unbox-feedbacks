import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedAdminRoute = ({ children }) => {
  const { admin } = useContext(AuthContext);

  if (!admin) {
    return <Navigate to="/admin" />;
  }
  return children;
};

export default ProtectedAdminRoute;
