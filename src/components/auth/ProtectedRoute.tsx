
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
  isAuthenticated: boolean;
  isAdmin?: boolean;
  userRole?: string;
  redirectTo?: string;
}

const ProtectedRoute = ({
  children,
  isAuthenticated,
  isAdmin = false,
  userRole = "",
  redirectTo = "/login"
}: ProtectedRouteProps) => {
  // For now we'll use a simple check - in a real app this would connect to Supabase auth
  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }
  
  // Check admin permission if required
  if (isAdmin && userRole !== "admin") {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
};

export default ProtectedRoute;
