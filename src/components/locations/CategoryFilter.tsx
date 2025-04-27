
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface CategoryFilterProps {
  categories: Category[];
  onCategorySelect: (categoryId: string | null) => void;
}

const CategoryFilter = ({ categories, onCategorySelect }: CategoryFilterProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const handleCategoryClick = (categoryId: string) => {
    const newValue = selectedCategory === categoryId ? null : categoryId;
    setSelectedCategory(newValue);
    onCategorySelect(newValue);
  };
  
  return (
    <div className="mb-8">
      <h2 className="text-lg font-medium mb-4">Categories</h2>
      <ScrollArea className="w-full">
        <div className="flex space-x-2 pb-3">
          <Button
            variant={selectedCategory === null ? "default" : "outline"}
            size="sm"
            onClick={() => {
              setSelectedCategory(null);
              onCategorySelect(null);
            }}
            className={selectedCategory === null ? "bg-cluj-primary hover:bg-cluj-secondary" : ""}
          >
            All
          </Button>
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => handleCategoryClick(category.id)}
              className={selectedCategory === category.id ? "bg-cluj-primary hover:bg-cluj-secondary" : ""}
            >
              {category.name}
            </Button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default CategoryFilter;
