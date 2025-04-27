
import MainLayout from "@/components/layout/MainLayout";
import CategoryGrid from "@/components/categories/CategoryGrid";
import { categories } from "@/data/mockData";

const CategoriesPage = () => {
  return (
    <MainLayout
      title="Categories - Cluj Compass"
      description="Browse all categories of places in Cluj-Napoca. Find restaurants, cafes, attractions, parks, museums, and more."
    >
      <div className="page-container">
        <h1 className="text-3xl font-bold mb-8">Categories</h1>
        
        <CategoryGrid categories={categories} />
      </div>
    </MainLayout>
  );
};

export default CategoriesPage;
