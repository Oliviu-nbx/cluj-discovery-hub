
import { Link } from "react-router-dom";

interface CategoryCardProps {
  id: string;
  name: string;
  slug: string;
  imageUrl: string;
  count: number;
}

const CategoryCard = ({ id, name, slug, imageUrl, count }: CategoryCardProps) => {
  return (
    <Link to={`/categories/${slug}`} className="block group animate-fade-in">
      <div className="relative h-48 rounded-lg overflow-hidden shadow-md">
        <img 
          src={imageUrl} 
          alt={name}
          className="h-full w-full object-cover transform transition-transform group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4">
          <h3 className="text-white text-lg font-medium">{name}</h3>
          <p className="text-white/80 text-sm">{count} locations</p>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;
