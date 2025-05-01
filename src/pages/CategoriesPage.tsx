
import MainLayout from "@/components/layout/MainLayout";
import CategoryGrid from "@/components/categories/CategoryGrid";
import { useLanguage } from "@/contexts/LanguageContext";
import { useEffect, useState } from "react";
import { fetchXMLLocations, getCategories } from "@/services/dataService";
import { Category } from "@/services/dataService";
import { toast } from "@/components/ui/sonner";

const CategoriesPage = () => {
  const { t } = useLanguage();
  const [isLoading, setIsLoading] = useState(true);
  const [categoriesData, setCategoriesData] = useState<Category[]>([]);
  
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        // Attempt to fetch XML data
        await fetchXMLLocations();
        
        // Get the updated categories
        const loadedCategories = await getCategories();
        setCategoriesData(loadedCategories);
      } catch (error) {
        console.error("Error loading categories:", error);
        toast.error("Failed to load categories");
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, []);
  
  return (
    <MainLayout
      title={`${t("categories.title")} - Cluj Compass`}
      description="Browse all categories of places in Cluj-Napoca. Find restaurants, cafes, attractions, parks, museums, and more."
    >
      <div className="page-container">
        <h1 className="text-3xl font-bold mb-8">{t("categories.title")}</h1>
        
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cluj-primary"></div>
          </div>
        ) : categoriesData.length > 0 ? (
          <CategoryGrid categories={categoriesData} />
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">No categories found. Please try again later.</p>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default CategoriesPage;
