
import { Link } from "react-router-dom";
import { Star, MapPin, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export interface LocationCardProps {
  id: string;
  name: string;
  slug: string;
  category: string;
  address: string;
  imageUrl: string;
  rating: number;
  reviewCount: number;
  priceLevel: 1 | 2 | 3 | 4;
  isOpenNow?: boolean;
  categoryId?: string;
}

const categoryAccents: Record<string, { color: string; bgLight: string; icon: string }> = {
  restaurants: {
    color: "text-orange-600",
    bgLight: "bg-orange-50",
    icon: "🍽️",
  },
  cafes: {
    color: "text-amber-600",
    bgLight: "bg-amber-50",
    icon: "☕",
  },
  hotels: {
    color: "text-purple-600",
    bgLight: "bg-purple-50",
    icon: "🏨",
  },
  attractions: {
    color: "text-blue-600",
    bgLight: "bg-blue-50",
    icon: "🎯",
  },
  parks: {
    color: "text-green-600",
    bgLight: "bg-green-50",
    icon: "🌳",
  },
  default: {
    color: "text-cluj-primary",
    bgLight: "bg-cluj-primary/10",
    icon: "📍",
  },
};

const LocationCard = ({
  id,
  name,
  slug,
  category,
  address,
  imageUrl,
  rating,
  reviewCount,
  priceLevel,
  isOpenNow
}: LocationCardProps) => {
  const style = categoryAccents[category.toLowerCase()] || categoryAccents.default;
  
  const renderPriceLevel = () => {
    const price = Array(priceLevel).fill("€").join("");
    return <span className="text-gray-500 text-sm">{price}</span>;
  };

  return (
    <Link to={`/location/${slug}`} className="group block animate-fade-in">
      <div className={`bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl border border-transparent hover:border-${style.color}/20`}>
        <div className="relative h-48">
          <img 
            src={imageUrl} 
            alt={name} 
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" 
          />
          <div className="absolute top-2 left-2 flex gap-2">
            <Badge variant="secondary" className={`${style.bgLight} ${style.color} shadow-sm font-medium`}>
              <span className="mr-1">{style.icon}</span>
              {category}
            </Badge>
          </div>
          {isOpenNow !== undefined && (
            <div className="absolute top-2 right-2">
              <Badge variant={isOpenNow ? "default" : "secondary"} className={`${isOpenNow ? 'bg-green-500' : 'bg-gray-300'} shadow-sm`}>
                <Clock className="h-3 w-3 mr-1" />
                {isOpenNow ? "Open" : "Closed"}
              </Badge>
            </div>
          )}
        </div>
        
        <div className="p-4">
          <div className="flex justify-between items-start">
            <h3 className={`font-medium text-lg group-hover:${style.color}`}>{name}</h3>
            <div className="flex items-center">
              <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
              <span className="text-sm font-medium">{rating.toFixed(1)}</span>
              <span className="text-xs text-gray-500 ml-1">({reviewCount})</span>
            </div>
          </div>
          
          <div className="mt-2 flex items-center text-sm text-gray-600">
            <MapPin className={`h-3 w-3 ${style.color} mr-1 flex-shrink-0`} />
            <span className="truncate">{address}</span>
          </div>
          
          <div className="mt-2 flex justify-between items-center">
            {renderPriceLevel()}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default LocationCard;
