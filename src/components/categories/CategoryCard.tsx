
import { Link } from "react-router-dom";

interface CategoryCardProps {
  id: string;
  name: string;
  slug: string;
  imageUrl: string;
  count: number;
}

// Category-specific gradients and colors
const categoryStyles: Record<string, { gradient: string; hover: string }> = {
  restaurants: {
    gradient: "from-orange-500/80 to-pink-500/80",
    hover: "group-hover:shadow-orange-500/25",
  },
  cafes: {
    gradient: "from-amber-500/80 to-yellow-500/80",
    hover: "group-hover:shadow-amber-500/25",
  },
  hotels: {
    gradient: "from-purple-500/80 to-violet-500/80",
    hover: "group-hover:shadow-purple-500/25",
  },
  attractions: {
    gradient: "from-blue-500/80 to-cyan-500/80",
    hover: "group-hover:shadow-blue-500/25",
  },
  parks: {
    gradient: "from-green-500/80 to-emerald-500/80",
    hover: "group-hover:shadow-green-500/25",
  },
  malls: {
    gradient: "from-pink-400/80 to-rose-500/80",
    hover: "group-hover:shadow-pink-500/25",
  },
  gyms: {
    gradient: "from-red-500/80 to-orange-400/80",
    hover: "group-hover:shadow-red-500/25",
  },
  libraries: {
    gradient: "from-indigo-500/80 to-blue-400/80",
    hover: "group-hover:shadow-indigo-500/25",
  },
  bakeries: {
    gradient: "from-amber-400/80 to-yellow-300/80",
    hover: "group-hover:shadow-amber-500/25",
  },
  museums: {
    gradient: "from-slate-600/80 to-slate-400/80",
    hover: "group-hover:shadow-slate-500/25",
  },
  default: {
    gradient: "from-cluj-primary/80 to-cluj-secondary/80",
    hover: "group-hover:shadow-cluj-primary/25",
  },
};

const CategoryCard = ({ id, name, slug, imageUrl, count }: CategoryCardProps) => {
  const style = categoryStyles[slug.toLowerCase()] || categoryStyles.default;

  return (
    <Link to={`/categories/${slug}`} className="block group animate-fade-in">
      <div className={`relative h-48 rounded-lg overflow-hidden shadow-lg transition-all duration-300 ${style.hover}`}>
        <img 
          src={imageUrl} 
          alt={name}
          className="h-full w-full object-cover transform transition-transform duration-300 group-hover:scale-110"
        />
        <div className={`absolute inset-0 bg-gradient-to-br ${style.gradient} opacity-90 mix-blend-multiply`} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4">
          <h3 className="text-white text-xl font-semibold mb-1">{name}</h3>
          <p className="text-white/90 text-sm backdrop-blur-sm bg-black/20 w-fit px-2 py-1 rounded-full">
            {count} locations
          </p>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;
