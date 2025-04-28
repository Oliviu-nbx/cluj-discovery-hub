
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/sonner";

interface User {
  id: string;
  email: string;
  role: "user" | "admin" | "business_owner";
  businessId?: string; // If they're a business owner
  name?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  checkBusinessOwnership: (businessId: string) => boolean;
  isAdmin: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock authentication service (replace with Supabase in production)
const mockUsers = [
  { 
    id: "1", 
    email: "admin@clujcompass.com", 
    password: "admin123", 
    name: "Admin User", 
    role: "admin" as const
  },
  { 
    id: "2", 
    email: "user@example.com", 
    password: "password123", 
    name: "Regular User", 
    role: "user" as const
  },
  { 
    id: "3", 
    email: "business@clujcafe.ro", 
    password: "business123", 
    name: "Business Owner", 
    role: "business_owner" as const,
    businessId: "cafe-1"
  }
];

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  
  // Check if user is already logged in (localStorage)
  useEffect(() => {
    const storedUser = localStorage.getItem("clujCompassUser");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        localStorage.removeItem("clujCompassUser");
      }
    }
    setIsLoading(false);
  }, []);
  
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    // Mock API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const foundUser = mockUsers.find(
      u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );
    
    if (foundUser) {
      const userData: User = {
        id: foundUser.id,
        email: foundUser.email,
        role: foundUser.role,
        name: foundUser.name,
        businessId: foundUser.businessId
      };
      
      setUser(userData);
      localStorage.setItem("clujCompassUser", JSON.stringify(userData));
      toast.success("Logged in successfully");
      navigate("/");
    } else {
      throw new Error("Invalid email or password");
    }
    
    setIsLoading(false);
  };
  
  const register = async (email: string, password: string, name: string) => {
    setIsLoading(true);
    
    // Check if user already exists
    if (mockUsers.some(u => u.email.toLowerCase() === email.toLowerCase())) {
      setIsLoading(false);
      throw new Error("Email already in use");
    }
    
    // Mock API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // In a real app, this would be handled by Supabase or another backend
    const newUser: User = {
      id: `user-${Date.now()}`,
      email,
      name,
      role: "user"
    };
    
    setUser(newUser);
    localStorage.setItem("clujCompassUser", JSON.stringify(newUser));
    toast.success("Registered successfully");
    navigate("/");
    setIsLoading(false);
  };
  
  const logout = () => {
    setUser(null);
    localStorage.removeItem("clujCompassUser");
    toast.info("Logged out");
    navigate("/login");
  };
  
  const checkBusinessOwnership = (businessId: string) => {
    return user?.role === "business_owner" && user.businessId === businessId;
  };
  
  const isAdmin = () => {
    return user?.role === "admin";
  };
  
  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isAuthenticated: !!user, 
        isLoading, 
        login, 
        register, 
        logout,
        checkBusinessOwnership,
        isAdmin
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
