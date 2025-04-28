
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

// Authentication
import { AuthProvider } from "./components/auth/AuthProvider";
import ProtectedRoute from "./components/auth/ProtectedRoute";

// Pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import CategoriesPage from "./pages/CategoriesPage";
import CategoryPage from "./pages/CategoryPage";
import LocationDetails from "./pages/LocationDetails";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import NotFoundLocation from "./pages/NotFoundLocation";
import AdminDashboard from "./pages/AdminDashboard";
import AdminLocationForm from "./pages/AdminLocationForm";
import BusinessClaim from "./pages/BusinessClaim";
import MyBusinessDashboard from "./pages/MyBusinessDashboard";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Index />} />
              <Route path="/categories" element={<CategoriesPage />} />
              <Route path="/categories/:slug" element={<CategoryPage />} />
              <Route path="/location/:slug" element={<LocationDetails />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/location-not-found" element={<NotFoundLocation />} />
              
              {/* Protected Routes - Admin Only */}
              <Route 
                path="/admin" 
                element={
                  <ProtectedRoute requireAuth requireAdmin>
                    <AdminDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/locations/add" 
                element={
                  <ProtectedRoute requireAuth requireAdmin>
                    <AdminLocationForm />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/locations/edit/:id" 
                element={
                  <ProtectedRoute requireAuth requireAdmin>
                    <AdminLocationForm />
                  </ProtectedRoute>
                } 
              />
              
              {/* Business Routes */}
              <Route 
                path="/location/:slug/claim" 
                element={
                  <ProtectedRoute requireAuth>
                    <BusinessClaim />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/my-business" 
                element={
                  <ProtectedRoute requireAuth requireBusiness>
                    <MyBusinessDashboard />
                  </ProtectedRoute>
                } 
              />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
