
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "@/components/ui/sonner";
import { useAuth } from "@/components/auth/AuthProvider";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await login(email, password);
      // The redirect is handled in the login function
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  };
  
  return (
    <MainLayout
      title="Login - Cluj Compass"
      description="Log in to your Cluj Compass account to save favorite places, submit reviews, and more."
    >
      <div className="max-w-md mx-auto py-12 px-4 sm:px-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Welcome Back</h1>
          <p className="text-gray-600 mt-2">Log in to your Cluj Compass account</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 sm:p-8">
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-2.5 text-gray-500"
                    onClick={() => setShowPassword(!showPassword)}
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                <div className="mt-1 text-right">
                  <Link to="/forgot-password" className="text-sm text-cluj-primary hover:underline">
                    Forgot password?
                  </Link>
                </div>
              </div>
              
              <div className="pt-2">
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Logging in..." : "Login"}
                </Button>
              </div>
            </div>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link to="/register" className="text-cluj-primary hover:underline">
                Register
              </Link>
            </p>
          </div>
          
          <div className="mt-8 p-4 bg-gray-50 rounded-md">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Demo Accounts:</h3>
            <div className="text-xs text-gray-600 space-y-1">
              <p>Admin: admin@clujcompass.com / admin123</p>
              <p>User: user@example.com / password123</p>
              <p>Business Owner: business@clujcafe.ro / business123</p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default LoginPage;
