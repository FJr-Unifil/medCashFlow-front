import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface Props {
  children: ReactNode;
}

export function ProtectedRoute({ children }: Props) {
  const isAuthenticated = false;

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  return children;
}