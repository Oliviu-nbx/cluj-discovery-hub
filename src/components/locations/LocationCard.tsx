
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
  cuisine?: string[];
  hotelClass?: string;
  price?: string;
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
  isOpenNow,
  cuisine,
  hotelClass,
  price
}: LocationCardProps) => {
  const categoryKey = category.toLowerCase();
  const style = categoryAccents[categoryKey] || categoryAccents.default;
  
  const renderPriceLevel = () => {
    if (price) return <span className="text-gray-500 text-sm">{price}</span>;
    const priceSymbol = Array(priceLevel).fill("€").join("");
    return <span className="text-gray-500 text-sm">{priceSymbol}</span>;
  };

  // Helper function to render stars for hotel class
  const renderHotelClass = () => {
    if (!hotelClass) return null;
    const starCount = Number(hotelClass.charAt(0)) || 0;
    
    return (
      <div className="flex items-center">
        {Array(Math.floor(starCount)).fill(0).map((_, i) => (
          <Star key={i} className="h-3 w-3 fill-yellow-500 text-yellow-500" />
        ))}
      </div>
    );
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
          
          <div className="mt-3 flex justify-between items-center">
            {renderPriceLevel()}
            
            {/* Show cuisine for restaurants */}
            {categoryKey === 'restaurants' && cuisine && cuisine.length > 0 && (
              <div className="text-xs text-gray-500">
                {cuisine.slice(0, 3).join(", ")}
              </div>
            )}
            
            {/* Show hotel class for hotels */}
            {categoryKey === 'hotels' && renderHotelClass()}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default LocationCard;
