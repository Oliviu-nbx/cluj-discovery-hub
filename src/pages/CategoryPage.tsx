
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import LocationGrid from "@/components/locations/LocationGrid";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, Loader2 } from "lucide-react";
import { getCategoryBySlug, fetchXMLLocations, getLocationsByCategory } from "@/services/dataService";
import { toast } from "@/components/ui/sonner";
import { Category, Location } from "@/services/dataService";

const CategoryPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [category, setCategory] = useState<Category | null>(null);
  const [filteredLocations, setFilteredLocations] = useState<Location[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [locationsLoading, setLocationsLoading] = useState(true);
  const [dataFetched, setDataFetched] = useState(false);
  
  // Fetch external data once when component mounts
  useEffect(() => {
    if (!dataFetched) {
      console.log("Fetching initial XML data for category page");
      const fetchData = async () => {
        try {
          await fetchXMLLocations();
          console.log("XML data fetched successfully for category page");
          setDataFetched(true);
        } catch (error) {
          console.error("Error fetching XML data:", error);
          toast.error("Error loading data. Using existing data.");
          // Don't block the user experience if fetch fails
          setDataFetched(true);
        }
      };
      
      fetchData();
    }
  }, [dataFetched]);
  
  // Fetch category by slug
  useEffect(() => {
    const loadCategory = async () => {
      setIsLoading(true);
      try {
        if (!slug) {
          console.error("No slug provided");
          toast.error("Category not found");
          setIsLoading(false);
          return;
        }

        console.log(`Getting category by slug: ${slug}`);
        const foundCategory = await getCategoryBySlug(slug);
        
        if (foundCategory) {
          console.log(`Found category: ${foundCategory.name}`);
          setCategory(foundCategory);
          setLocationsLoading(true);
          
          console.log(`Getting locations for category: ${foundCategory.id}`);
          const categoryLocations = await getLocationsByCategory(foundCategory.id);
          console.log(`Found ${categoryLocations.length} locations for category`);
          
          setFilteredLocations(categoryLocations);
        } else {
          console.error(`Category with slug "${slug}" not found`);
          toast.error("Category not found");
        }
      } catch (error) {
        console.error(`Error loading category "${slug}":`, error);
        toast.error("Error loading category");
      } finally {
        setIsLoading(false);
        setLocationsLoading(false);
      }
    };
    
    loadCategory();
  }, [slug, dataFetched]); // Also reload when external data is fetched
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!category) return;
    
    setLocationsLoading(true);
    
    const performSearch = async () => {
      try {
        const allCategoryLocations = await getLocationsByCategory(category.id);
        
        if (searchQuery.trim() === "") {
          setFilteredLocations(allCategoryLocations);
        } else {
          const query = searchQuery.toLowerCase().trim();
          const results = allCategoryLocations.filter(location => 
            location.name.toLowerCase().includes(query) || 
            location.address.toLowerCase().includes(query) ||
            location.description?.toLowerCase().includes(query)
          );
          setFilteredLocations(results);
        }
      } catch (error) {
        console.error("Error searching locations:", error);
        toast.error("Error searching locations");
      } finally {
        setLocationsLoading(false);
      }
    };
    
    performSearch();
  };
  
  if (isLoading) {
    return (
      <MainLayout>
        <div className="page-container">
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-12 w-12 animate-spin text-cluj-primary mr-2" />
            <span>Loading category...</span>
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
        <LocationGrid locations={filteredLocations} isLoading={locationsLoading} />
      </div>
    </MainLayout>
  );
};

export default CategoryPage;
