
import LocationCard, { LocationCardProps } from "./LocationCard";

interface LocationGridProps {
  locations: any[]; // Use any[] temporarily to accept the mock data
}

const LocationGrid = ({ locations }: LocationGridProps) => {
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
