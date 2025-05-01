
import LocationCard, { LocationCardProps } from "./LocationCard";
import { Location } from "@/services/dataService";

interface LocationGridProps {
  locations: Location[]; // Use the proper Location type from dataService
  isLoading?: boolean;
}

const LocationGrid = ({ locations, isLoading = false }: LocationGridProps) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cluj-primary"></div>
      </div>
    );
  }
  
  if (!locations || locations.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-xl text-gray-600">No locations found.</p>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {locations.map((location) => {
        // Create a properly typed object for LocationCard
        const locationProps: LocationCardProps = {
          id: location.id,
          name: location.name,
          slug: location.slug,
          category: location.category,
          address: location.address,
          imageUrl: location.imageUrl,
          rating: location.rating,
          reviewCount: location.reviewCount,
          priceLevel: location.priceLevel as 1 | 2 | 3 | 4,
          isOpenNow: location.isOpenNow,
          categoryId: location.categoryId,
          cuisine: location.cuisine,
          hotelClass: location.hotelClass,
          price: location.price
        };
        return <LocationCard key={location.id} {...locationProps} />;
      })}
    </div>
  );
};

export default LocationGrid;
