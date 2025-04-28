
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import { Loader2 } from "lucide-react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  requireAdmin?: boolean;
  requireBusiness?: boolean;
  businessId?: string;
  redirectTo?: string;
}

const ProtectedRoute = ({
  children,
  requireAuth = true,
  requireAdmin = false,
  requireBusiness = false,
  businessId,
  redirectTo = "/login"
}: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading, user, isAdmin, checkBusinessOwnership } = useAuth();
  const location = useLocation();
  
  // Show loading state while auth is being checked
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-cluj-primary" />
        <span className="ml-2">Checking authentication...</span>
      </div>
    );
  }
  
  // Check if authentication is required but user is not authenticated
  if (requireAuth && !isAuthenticated) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }
  
  // Check if admin permissions are required
  if (requireAdmin && !isAdmin()) {
    return <Navigate to="/" replace />;
  }
  
  // Check if business ownership is required
  if (requireBusiness && businessId && !checkBusinessOwnership(businessId)) {
    return <Navigate to="/" replace />;
  }
  
  // If all checks pass, render the protected content
  return <>{children}</>;
};

export default ProtectedRoute;
