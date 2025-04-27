
import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Menu, X, MapPin, User, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Placeholder for authentication status
  const isAuthenticated = false;
  
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Will implement search functionality later
    console.log("Searching for:", searchQuery);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and brand */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <MapPin className="h-8 w-8 text-cluj-primary" />
              <span className="ml-2 text-xl font-semibold text-cluj-dark">
                Cluj<span className="text-cluj-primary">Compass</span>
              </span>
            </Link>
          </div>
          
          {/* Desktop navigation */}
          <div className="hidden md:flex items-center">
            {/* Search bar */}
            <div className="mx-4">
              <form onSubmit={handleSearchSubmit} className="relative">
                <input
                  type="text"
                  placeholder="Search locations..."
                  className="pl-10 pr-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-cluj-primary focus:border-transparent w-64"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </form>
            </div>
            
            {/* Navigation links */}
            <nav className="flex space-x-4 items-center">
              <Link to="/" className="px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-100">
                Home
              </Link>
              <Link to="/categories" className="px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-100">
                Categories
              </Link>
              <Link to="/about" className="px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-100">
                About
              </Link>
              
              {isAuthenticated ? (
                <>
                  <Link to="/favorites" className="p-2 rounded-full hover:bg-gray-100">
                    <Heart className="h-5 w-5 text-cluj-primary" />
                  </Link>
                  <Link to="/profile" className="p-2 rounded-full hover:bg-gray-100">
                    <User className="h-5 w-5 text-cluj-primary" />
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/login">
                    <Button variant="outline" size="sm">Login</Button>
                  </Link>
                  <Link to="/register">
                    <Button size="sm">Register</Button>
                  </Link>
                </>
              )}
            </nav>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              className="p-2 rounded-md hover:bg-gray-100"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? 
                <X className="h-6 w-6 text-gray-500" /> : 
                <Menu className="h-6 w-6 text-gray-500" />
              }
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-4 pt-4 pb-4">
            <form onSubmit={handleSearchSubmit}>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search locations..."
                  className="pl-10 pr-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-cluj-primary focus:border-transparent w-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </form>
          </div>
          <div className="px-2 pt-2 pb-4 space-y-1">
            <Link 
              to="/" 
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/categories" 
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100"
              onClick={() => setMobileMenuOpen(false)}
            >
              Categories
            </Link>
            <Link 
              to="/about" 
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            {isAuthenticated ? (
              <>
                <Link 
                  to="/favorites" 
                  className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <div className="flex items-center">
                    <Heart className="h-5 w-5 mr-2 text-cluj-primary" />
                    <span>Favorites</span>
                  </div>
                </Link>
                <Link 
                  to="/profile" 
                  className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <div className="flex items-center">
                    <User className="h-5 w-5 mr-2 text-cluj-primary" />
                    <span>Profile</span>
                  </div>
                </Link>
              </>
            ) : (
              <div className="flex flex-col space-y-2 px-3 py-2">
                <Link 
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Button variant="outline" className="w-full">Login</Button>
                </Link>
                <Link 
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Button className="w-full">Register</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
