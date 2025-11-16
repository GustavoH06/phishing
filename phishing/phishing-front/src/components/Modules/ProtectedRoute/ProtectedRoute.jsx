import { Navigate } from 'react-router-dom';
import authService from '../../../services/authService';

function ProtectedRoute({ children, adminOnly = false }) {
  if (!authService.isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && !authService.isAdmin()) {
    return <Navigate to="/home" replace />;
  }

  return children;
}

export default ProtectedRoute;