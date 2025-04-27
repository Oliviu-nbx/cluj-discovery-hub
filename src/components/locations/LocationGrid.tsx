
import LocationCard, { LocationCardProps } from "./LocationCard";

interface LocationGridProps {
  locations: LocationCardProps[];
}

const LocationGrid = ({ locations }: LocationGridProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {locations.map((location) => (
        <LocationCard key={location.id} {...location} />
      ))}
    </div>
  );
};

export default LocationGrid;
