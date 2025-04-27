
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
}

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
  // Price level indicator
  const renderPriceLevel = () => {
    const price = Array(priceLevel).fill("€").join("");
    return <span className="text-gray-500 text-sm">{price}</span>;
  };

  return (
    <Link to={`/location/${slug}`} className="location-card block animate-fade-in">
      <div className="relative h-48">
        <img 
          src={imageUrl} 
          alt={name} 
          className="h-full w-full object-cover" 
        />
        <div className="absolute top-2 left-2">
          <Badge variant="secondary" className="bg-white text-cluj-primary shadow-sm">
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
          <h3 className="font-medium text-lg">{name}</h3>
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
            <span className="text-sm font-medium">{rating.toFixed(1)}</span>
            <span className="text-xs text-gray-500 ml-1">({reviewCount})</span>
          </div>
        </div>
        
        <div className="mt-2 flex items-center text-sm text-gray-600">
          <MapPin className="h-3 w-3 text-gray-400 mr-1 flex-shrink-0" />
          <span className="truncate">{address}</span>
        </div>
        
        <div className="mt-2 flex justify-between items-center">
          {renderPriceLevel()}
        </div>
      </div>
    </Link>
  );
};

export default LocationCard;
