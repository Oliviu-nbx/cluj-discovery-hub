
import MainLayout from "@/components/layout/MainLayout";
import CategoryGrid from "@/components/categories/CategoryGrid";
import { categories } from "@/data/mockData";
import { useLanguage } from "@/contexts/LanguageContext";

const CategoriesPage = () => {
  const { t } = useLanguage();
  
  return (
    <MainLayout
      title={`${t("categories.title")} - Cluj Compass`}
      description="Browse all categories of places in Cluj-Napoca. Find restaurants, cafes, attractions, parks, museums, and more."
    >
      <div className="page-container">
        <h1 className="text-3xl font-bold mb-8">{t("categories.title")}</h1>
        
        <CategoryGrid categories={categories} />
      </div>
    </MainLayout>
  );
};

export default CategoriesPage;
