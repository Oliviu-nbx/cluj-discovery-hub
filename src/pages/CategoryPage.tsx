import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import LocationGrid from "@/components/locations/LocationGrid";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";
import { categories, locations } from "@/data/mockData";
import { fetchAndUpdateLocations } from "@/services/dataService";
import { toast } from "@/components/ui/sonner";

const CategoryPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [category, setCategory] = useState<any | null>(null);
  const [filteredLocations, setFilteredLocations] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [dataFetched, setDataFetched] = useState(false);
  
  // Fetch external data once when component mounts
  useEffect(() => {
    if (!dataFetched) {
      const fetchData = async () => {
        try {
          await fetchAndUpdateLocations();
          setDataFetched(true);
        } catch (error) {
          console.error("Error fetching external data:", error);
          // Don't block the user experience if external data fetch fails
          setDataFetched(true);
        }
      };
      
      fetchData();
    }
  }, [dataFetched]);
  
  // Fetch category and its locations
  useEffect(() => {
    setIsLoading(true);
    const foundCategory = categories.find(cat => cat.slug === slug);
    
    if (foundCategory) {
      setCategory(foundCategory);
      const categoryLocations = locations.filter(loc => loc.categoryId === foundCategory.id);
      setFilteredLocations(categoryLocations);
      setIsLoading(false);
    } else {
      // Handle category not found
      console.error(`Category with slug "${slug}" not found`);
      setIsLoading(false);
    }
  }, [slug, dataFetched]); // Also reload when external data is fetched
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!category) return;
    
    if (searchQuery.trim() === "") {
      const categoryLocations = locations.filter(loc => loc.categoryId === category.id);
      setFilteredLocations(categoryLocations);
      return;
    }
    
    const query = searchQuery.toLowerCase().trim();
    const results = locations.filter(location => {
      const matchesSearch = 
        location.name.toLowerCase().includes(query) || 
        location.address.toLowerCase().includes(query) ||
        location.description.toLowerCase().includes(query);
      
      return matchesSearch && location.categoryId === category.id;
    });
    
    setFilteredLocations(results);
  };
  
  if (isLoading) {
    return (
      <MainLayout>
        <div className="page-container">
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cluj-primary"></div>
          </div>
        </div>
      </MainLayout>
    );
  }
  
  if (!category) {
    return (
      <MainLayout>
        <div className="page-container">
          <div className="text-center py-20">
            <h1 className="text-3xl font-bold mb-4">Category Not Found</h1>
            <p className="text-lg text-gray-600 mb-8">The category you're looking for doesn't exist.</p>
            <Button asChild>
              <a href="/categories">View All Categories</a>
            </Button>
          </div>
        </div>
      </MainLayout>
    );
  }
  
  return (
    <MainLayout
      title={`${category.name} in Cluj-Napoca - Cluj Compass`}
      description={`Discover the best ${category.name.toLowerCase()} in Cluj-Napoca. Browse ratings, reviews, and find the perfect spots to visit.`}
    >
      {/* Category Header */}
      <div className="relative bg-cluj-dark text-white">
        <div 
          className="absolute inset-0 overflow-hidden opacity-30"
          style={{
            backgroundImage: `url('${category.imageUrl}')`,
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        ></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="md:w-2/3">
            <h1 className="text-3xl font-bold sm:text-4xl mb-4">
              {category.name} in Cluj-Napoca
            </h1>
            <p className="text-lg mb-6">
              Discover the best {category.name.toLowerCase()} in Cluj-Napoca
            </p>
            <div className="text-sm">
              <span>{category.count} locations</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Category Content */}
      <div className="page-container">
        {/* Search and Filter Bar */}
        <div className="mb-8">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-grow">
              <Input
                type="text"
                placeholder={`Search ${category.name.toLowerCase()}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            <Button type="submit">Search</Button>
            <Button variant="outline" type="button" className="sm:ml-2">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </form>
        </div>
        
        {/* Locations Grid */}
        {filteredLocations.length > 0 ? (
          <LocationGrid locations={filteredLocations} />
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">No locations found in this category. Try a different search.</p>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default CategoryPage;
