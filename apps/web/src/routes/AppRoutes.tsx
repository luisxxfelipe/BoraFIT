import { Route, Routes, Navigate } from 'react-router-dom';
import DashboardPage from '../pages/DashboardPage';
import { useAuth } from '../contexts/AuthContext';

import type { ReactNode } from 'react';

function PrivateRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/dashboard" element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}
