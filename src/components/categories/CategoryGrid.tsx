
import CategoryCard from "./CategoryCard";

interface CategoryGridProps {
  categories: {
    id: string;
    name: string;
    slug: string;
    imageUrl: string;
    count: number;
  }[];
}

const CategoryGrid = ({ categories }: CategoryGridProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {categories.map((category) => (
        <CategoryCard key={category.id} {...category} />
      ))}
    </div>
  );
};

export default CategoryGrid;
