
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import CategoryFilter from "@/components/locations/CategoryFilter";
import LocationGrid from "@/components/locations/LocationGrid";
import { Button } from "@/components/ui/button";
import { Search, Loader2 } from "lucide-react";
import { useAuth } from "@/components/auth/AuthProvider";
import { getLocations, getCategories, fetchXMLLocations } from "@/services/dataService";
import { toast } from "@/components/ui/sonner";

const Index = () => {
  const [filteredLocations, setFilteredLocations] = useState<any[]>([]);
  const [allLocations, setAllLocations] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [featuredCategories, setFeaturedCategories] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [dataFetched, setDataFetched] = useState(false);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        console.log("Fetching XML data...");
        // First, fetch XML data to ensure we have the latest locations
        await fetchXMLLocations();
        console.log("XML data fetched successfully");
        
        // Then get all the locations and categories
        console.log("Getting locations and categories...");
        const [locationsData, categoriesData] = await Promise.all([
          getLocations(),
          getCategories()
        ]);
        
        console.log(`Retrieved ${locationsData.length} locations and ${categoriesData.length} categories`);
        
        if (locationsData.length === 0) {
          toast.warning("No locations found. Try refreshing the page.");
        }
        
        setAllLocations(locationsData);
        setFilteredLocations(locationsData);
        setCategories(categoriesData);
        setFeaturedCategories(categoriesData.slice(0, 3));
        setDataFetched(true);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Error loading data. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  const handleCategorySelect = (categoryId: string | null) => {
    setSelectedCategory(categoryId);
    
    if (categoryId) {
      setFilteredLocations(allLocations.filter(location => location.categoryId === categoryId));
    } else {
      setFilteredLocations(allLocations);
    }
  };
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (searchQuery.trim() === "") {
      if (selectedCategory) {
        setFilteredLocations(allLocations.filter(location => location.categoryId === selectedCategory));
      } else {
        setFilteredLocations(allLocations);
      }
      return;
    }
    
    const query = searchQuery.toLowerCase().trim();
    const results = allLocations.filter(location => {
      const matchesSearch = 
        location.name.toLowerCase().includes(query) || 
        location.address.toLowerCase().includes(query) ||
        location.description.toLowerCase().includes(query);
      
      return selectedCategory 
        ? matchesSearch && location.categoryId === selectedCategory
        : matchesSearch;
    });
    
    setFilteredLocations(results);
  };
  
  return (
    <MainLayout>
      {/* Hero Section */}
      <div className="relative bg-cluj-dark text-white">
        <div 
          className="absolute inset-0 overflow-hidden opacity-30"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1585211969224-3e992986159d?w=800&auto=format&fit=crop&q=60')",
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        ></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl font-extrabold sm:text-5xl md:text-6xl mb-6">
              Discover Cluj-Napoca
            </h1>
            <p className="text-xl mb-8">
              Your ultimate guide to the best places in Cluj
            </p>
            
            <form onSubmit={handleSearch} className="max-w-lg mx-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for restaurants, cafes, attractions..."
                  className="w-full px-5 py-3 pr-12 rounded-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-cluj-primary"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button
                  type="submit"
                  className="absolute right-2 top-2 p-1 rounded-full bg-cluj-primary text-white hover:bg-cluj-secondary"
                >
                  <Search className="h-5 w-5" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="h-10 w-10 animate-spin text-cluj-primary" />
          <span className="ml-2">Loading location data...</span>
        </div>
      ) : (
        <>
          <div className="page-container">
            <div className="flex justify-between items-center mb-6">
              <h2 className="section-title">Featured Categories</h2>
              <Link to="/categories">
                <Button variant="outline">View All Categories</Button>
              </Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {featuredCategories.length > 0 ? (
                featuredCategories.map((category) => (
                  <Link key={category.id} to={`/categories/${category.slug}`}>
                    <div className="relative h-40 rounded-lg overflow-hidden shadow-md">
                      <img 
                        src={category.imageUrl} 
                        alt={category.name}
                        className="h-full w-full object-cover transform transition-transform hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4">
                        <h3 className="text-white text-lg font-medium">{category.name}</h3>
                        <p className="text-white/80 text-sm">{category.count} locations</p>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="col-span-3 text-center py-12">
                  <p className="text-lg text-gray-600">No categories found. Please try again later.</p>
                </div>
              )}
            </div>
          </div>
          
          <div className="page-container">
            <h2 className="section-title">Explore Locations</h2>
            
            <CategoryFilter 
              categories={categories} 
              onCategorySelect={handleCategorySelect} 
            />
            
            <LocationGrid 
              locations={filteredLocations} 
              isLoading={isLoading && !dataFetched} 
            />
          </div>
        </>
      )}
      
      {/* CTA Section */}
      <div className="bg-cluj-primary text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Are You a Business Owner?</h2>
            <p className="text-lg mb-8">
              Add your business to Cluj Compass and reach more customers. It's quick and easy!
            </p>
            {isAuthenticated ? (
              <Button onClick={() => navigate("/contact")} variant="outline" className="text-white border-white hover:bg-white hover:text-cluj-primary">
                Contact Us
              </Button>
            ) : (
              <Button onClick={() => navigate("/register")} variant="outline" className="text-white border-white hover:bg-white hover:text-cluj-primary">
                Register Now
              </Button>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Index;
