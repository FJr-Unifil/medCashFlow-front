import { type ReactNode, useContext } from 'react';
import { AuthContext } from '../context/auth-context';
import { Navigate } from 'react-router-dom';

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const auth = useContext(AuthContext);

  if (!auth?.isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  return children;
}