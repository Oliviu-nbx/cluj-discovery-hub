import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Menu, X, MapPin, User, Heart, Calendar, Bus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

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

              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-100">
                      Explore
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] lg:w-[600px] lg:grid-cols-2">
                        <li className="row-span-3">
                          <Link
                            to="/categories"
                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-cluj-primary/50 to-cluj-primary p-6 no-underline outline-none focus:shadow-md"
                          >
                            <div className="mb-2 mt-4 text-lg font-medium text-white">
                              Categories
                            </div>
                            <p className="text-sm leading-tight text-white/90">
                              Explore all categories including restaurants, cafes, attractions, and more.
                            </p>
                          </Link>
                        </li>
                        <ListItem to="/events" title="Events" icon={<Calendar className="h-4 w-4 mr-2" />}>
                          Discover upcoming events, festivals, and happenings in Cluj-Napoca
                        </ListItem>
                        <ListItem to="/transportation" title="Transportation" icon={<Bus className="h-4 w-4 mr-2" />}>
                          Find information about public transportation options in the city
                        </ListItem>
                        <ListItem to="/categories/restaurants" title="Restaurants">
                          Explore the best dining options in Cluj-Napoca
                        </ListItem>
                        <ListItem to="/categories/cafes" title="Cafes">
                          Discover coffee shops and cafes around the city
                        </ListItem>
                        <ListItem to="/categories/attractions" title="Attractions">
                          Find popular attractions and landmarks
                        </ListItem>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>

              <Link to="/events" className="px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-100 flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                Events
              </Link>
              
              <Link to="/transportation" className="px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-100 flex items-center">
                <Bus className="h-4 w-4 mr-1" />
                Transportation
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
              to="/events" 
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 flex items-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Calendar className="h-5 w-5 mr-2 text-cluj-primary" />
              <span>Events</span>
            </Link>
            <Link 
              to="/transportation" 
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 flex items-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Bus className="h-5 w-5 mr-2 text-cluj-primary" />
              <span>Transportation</span>
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

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & {
    to: string;
    title: string;
    icon?: React.ReactNode;
  }
>(({ className, title, children, icon, to, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          ref={ref}
          to={to}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none flex items-center">
            {icon && icon} {title}
          </div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

export default Header;
