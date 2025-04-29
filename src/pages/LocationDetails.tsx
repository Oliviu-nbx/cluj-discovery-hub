import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import MainLayout from "@/components/layout/MainLayout";
import { Heart, Star, MapPin, Phone, Globe, Clock, ChevronRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { locations } from "@/data/mockData";
import { fetchAndUpdateLocations } from "@/services/dataService";
import { Badge } from "@/components/ui/badge";

const LocationDetails = () => {
  const { slug } = useParams<{ slug: string }>();
  const [location, setLocation] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const [showAllAmenities, setShowAllAmenities] = useState(false);
  const [showAllOpeningHours, setShowAllOpeningHours] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [dataFetched, setDataFetched] = useState(false);
  
  // Fetch external data once
  useEffect(() => {
    if (!dataFetched) {
      fetchAndUpdateLocations().then(() => {
        setDataFetched(true);
      }).catch((error) => {
        console.error("Error fetching external data:", error);
        setDataFetched(true);
      });
    }
  }, [dataFetched]);
  
  // Fetch location data
  useEffect(() => {
    setIsLoading(true);
    
    // Wait for external data to be fetched before finding the location
    if (dataFetched) {
      const foundLocation = locations.find(loc => loc.slug === slug);
      
      if (foundLocation) {
        setLocation(foundLocation);
        setIsLoading(false);
      } else {
        // Handle location not found
        console.error(`Location with slug "${slug}" not found`);
        setIsLoading(false);
      }
    }
  }, [slug, dataFetched]);
  
  if (isLoading) {
    return (
      <MainLayout>
        <div className="page-container">
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cluj-primary"></div>
          </div>
        </div>
      </MainLayout>
    );
  }
  
  if (!location) {
    return (
      <MainLayout>
        <div className="page-container">
          <div className="text-center py-20">
            <h1 className="text-3xl font-bold mb-4">Location Not Found</h1>
            <p className="text-lg text-gray-600 mb-8">The location you're looking for doesn't exist.</p>
            <Button asChild>
              <a href="/">Return to Home</a>
            </Button>
          </div>
        </div>
      </MainLayout>
    );
  }
  
  // Render stars for ratings
  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= Math.floor(rating)) {
        stars.push(<Star key={i} className="h-4 w-4 fill-yellow-500 text-yellow-500" />);
      } else if (i - 0.5 <= rating) {
        stars.push(<Star key={i} className="h-4 w-4 fill-yellow-500 text-yellow-500 half-filled" />);
      } else {
        stars.push(<Star key={i} className="h-4 w-4 text-gray-300" />);
      }
    }
    return stars;
  };
  
  // Price level indicator
  const renderPriceLevel = (level: number) => {
    return Array(level).fill("€").join("");
  };
  
  // Handle favorite toggle
  const handleFavoriteToggle = () => {
    setIsFavorite(!isFavorite);
    // In a real app, would call API to save/remove from favorites
  };
  
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };
  
  // Helper function to render a list of features/amenities
  const renderFeatureList = (items: string[] | undefined, icon = true) => {
    if (!items || items.length === 0) return null;
    
    return (
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {icon && <ChevronRight className="h-4 w-4 text-cluj-primary mr-2" />}
            {item}
          </li>
        ))}
      </ul>
    );
  };
  
  // Helper function to render a section with expandable content
  const renderExpandableSection = (title: string, content: React.ReactNode, showAll: boolean, setShowAll: (show: boolean) => void, count = 4) => {
    if (!content) return null;
    
    return (
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-3">{title}</h3>
        {content}
        {Array.isArray(content) && content.length > count && (
          <Button 
            variant="ghost" 
            className="mt-2 text-cluj-primary"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? "Show less" : `Show all ${title.toLowerCase()}`}
            <ChevronDown className={`h-4 w-4 ml-1 transition-transform ${showAll ? 'rotate-180' : ''}`} />
          </Button>
        )}
      </div>
    );
  };
  
  return (
    <>
      <Helmet>
        <title>{`${location.name} - Cluj Compass`}</title>
        <meta name="description" content={location.description.substring(0, 160)} />
        <meta property="og:title" content={`${location.name} - Cluj Compass`} />
        <meta property="og:description" content={location.description.substring(0, 160)} />
        <meta property="og:image" content={location.photos[0]} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={window.location.href} />
        {/* Schema.org markup for this place */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": location.name,
            "image": location.photos,
            "address": {
              "@type": "PostalAddress",
              "streetAddress": location.address,
              "addressLocality": "Cluj-Napoca",
              "addressRegion": "Cluj",
              "addressCountry": "Romania"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": location.latitude,
              "longitude": location.longitude
            },
            "url": window.location.href,
            "telephone": location.phone,
            "priceRange": renderPriceLevel(location.priceLevel),
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": location.rating.toString(),
              "reviewCount": location.reviewCount.toString()
            }
          })}
        </script>
      </Helmet>
      <MainLayout>
        {/* Photo Gallery */}
        <div className="relative bg-gray-900">
          <div className="relative h-80 md:h-96 overflow-hidden">
            <img 
              src={location.photos[activePhotoIndex]} 
              alt={location.name} 
              className="w-full h-full object-cover"
            />
            
            {/* Photo navigation */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
              {location.photos.map((photo: string, index: number) => (
                <button 
                  key={index} 
                  className={`w-3 h-3 rounded-full ${index === activePhotoIndex ? 'bg-white' : 'bg-white/50'}`}
                  onClick={() => setActivePhotoIndex(index)}
                  aria-label={`View photo ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
        
        <div className="page-container">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start">
            <div className="md:w-2/3 md:pr-8">
              {/* Location header */}
              <div className="mb-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h1 className="text-3xl font-bold">{location.name}</h1>
                    <div className="flex items-center mt-2">
                      <span className="bg-cluj-primary/10 text-cluj-primary text-sm font-medium px-2 py-1 rounded">
                        {location.category}
                      </span>
                      <span className="mx-2 text-gray-500">•</span>
                      <div className="flex items-center">
                        <div className="flex mr-1">
                          {renderStars(location.rating)}
                        </div>
                        <span className="text-sm font-medium">{location.rating.toFixed(1)}</span>
                        <span className="text-sm text-gray-500 ml-1">({location.reviewCount})</span>
                      </div>
                      <span className="mx-2 text-gray-500">•</span>
                      <span className="text-sm text-gray-700">{renderPriceLevel(location.priceLevel)}</span>
                    </div>
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleFavoriteToggle}
                    className={isFavorite ? "text-red-500" : "text-gray-400"}
                    aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
                  >
                    <Heart className={isFavorite ? "fill-red-500" : ""} />
                  </Button>
                </div>
                
                <div className="mt-4">
                  <div className="flex items-start space-y-2 flex-col">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 text-gray-500 mr-2" />
                      <span>{location.address}</span>
                    </div>
                    
                    {location.phone && (
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 text-gray-500 mr-2" />
                        <a href={`tel:${location.phone}`} className="text-cluj-primary hover:underline">
                          {location.phone}
                        </a>
                      </div>
                    )}
                    
                    {location.website && (
                      <div className="flex items-center">
                        <Globe className="h-4 w-4 text-gray-500 mr-2" />
                        <a 
                          href={location.website} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-cluj-primary hover:underline"
                        >
                          Website
                        </a>
                      </div>
                    )}
                    
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 text-gray-500 mr-2" />
                      {location.isOpenNow ? (
                        <span className="text-green-600 font-medium">Open Now</span>
                      ) : (
                        <span className="text-red-600 font-medium">Closed</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Tabs */}
              <Tabs defaultValue="about" className="mt-8">
                <TabsList className="w-full border-b">
                  <TabsTrigger value="about" className="flex-1">About</TabsTrigger>
                  <TabsTrigger value="reviews" className="flex-1">Reviews</TabsTrigger>
                  <TabsTrigger value="photos" className="flex-1">Photos</TabsTrigger>
                  {location?.category === "Hotels" && (
                    <TabsTrigger value="rooms" className="flex-1">Rooms & Rates</TabsTrigger>
                  )}
                </TabsList>
                
                <TabsContent value="about" className="pt-4">
                  <div className="prose max-w-none">
                    <h3 className="text-xl font-semibold mb-3">Description</h3>
                    <p className="mb-6">{location.description}</p>
                    
                    {/* Restaurant-specific information */}
                    {location?.category === "Restaurants" && (
                      <>
                        {location.cuisine && location.cuisine.length > 0 && (
                          <div className="mb-6">
                            <h3 className="text-xl font-semibold mb-3">Cuisine</h3>
                            <div className="flex flex-wrap gap-2">
                              {location.cuisine.map((item: string, index: number) => (
                                <Badge key={index} variant="outline" className="bg-gray-100">
                                  {item}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {location.specialDiets && location.specialDiets.length > 0 && (
                          <div className="mb-6">
                            <h3 className="text-xl font-semibold mb-3">Special Diets</h3>
                            <div className="flex flex-wrap gap-2">
                              {location.specialDiets.map((item: string, index: number) => (
                                <Badge key={index} variant="outline" className="bg-gray-100">
                                  {item}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {location.meals && location.meals.length > 0 && (
                          <div className="mb-6">
                            <h3 className="text-xl font-semibold mb-3">Meals</h3>
                            <div className="flex flex-wrap gap-2">
                              {location.meals.map((item: string, index: number) => (
                                <Badge key={index} variant="outline" className="bg-gray-100">
                                  {item}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {location.features && location.features.length > 0 && (
                          <div className="mb-6">
                            <h3 className="text-xl font-semibold mb-3">Features</h3>
                            {renderFeatureList(location.features)}
                          </div>
                        )}
                      </>
                    )}
                    
                    {/* Hotel-specific information */}
                    {location?.category === "Hotels" && (
                      <>
                        {location.hotelClass && (
                          <div className="mb-6">
                            <h3 className="text-xl font-semibold mb-3">Hotel Class</h3>
                            <div className="flex items-center">
                              <div className="flex">
                                {Array(Math.floor(Number(location.hotelClass.charAt(0)) || 0)).fill(0).map((_, i) => (
                                  <Star key={i} className="h-5 w-5 fill-yellow-500 text-yellow-500" />
                                ))}
                              </div>
                              <span className="ml-2">{location.hotelClass}</span>
                            </div>
                          </div>
                        )}
                        
                        {location.hotelStyle && location.hotelStyle.length > 0 && (
                          <div className="mb-6">
                            <h3 className="text-xl font-semibold mb-3">Hotel Style</h3>
                            <div className="flex flex-wrap gap-2">
                              {location.hotelStyle.map((item: string, index: number) => (
                                <Badge key={index} variant="outline" className="bg-gray-100">
                                  {item}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {location.languages && location.languages.length > 0 && (
                          <div className="mb-6">
                            <h3 className="text-xl font-semibold mb-3">Languages Spoken</h3>
                            <div className="flex flex-wrap gap-2">
                              {location.languages.map((item: string, index: number) => (
                                <Badge key={index} variant="outline" className="bg-gray-100">
                                  {item}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {location.awards && location.awards.length > 0 && (
                          <div className="mb-6">
                            <h3 className="text-xl font-semibold mb-3">Awards & Recognition</h3>
                            <ul className="list-disc pl-5 space-y-1">
                              {location.awards.map((award: string, index: number) => (
                                <li key={index}>{award}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </>
                    )}
                    
                    {/* Common sections for all locations */}
                    {location?.amenities && location.amenities.length > 0 && (
                      <div className="mb-6">
                        <h3 className="text-xl font-semibold mb-3">Amenities</h3>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {location.amenities
                            .slice(0, showAllAmenities ? location.amenities.length : 4)
                            .map((amenity: string, index: number) => (
                              <li key={index} className="flex items-center">
                                <ChevronRight className="h-4 w-4 text-cluj-primary mr-2" />
                                {amenity}
                              </li>
                            ))}
                        </ul>
                        
                        {location.amenities.length > 4 && (
                          <Button 
                            variant="ghost" 
                            className="mt-2 text-cluj-primary"
                            onClick={() => setShowAllAmenities(!showAllAmenities)}
                          >
                            {showAllAmenities ? "Show less" : "Show all amenities"}
                            <ChevronDown className={`h-4 w-4 ml-1 transition-transform ${showAllAmenities ? 'rotate-180' : ''}`} />
                          </Button>
                        )}
                      </div>
                    )}
                    
                    {/* Hotel-specific property amenities */}
                    {location?.category === "Hotels" && location.propertyAmenities && location.propertyAmenities.length > 0 && (
                      <div className="mb-6">
                        <h3 className="text-xl font-semibold mb-3">Property Amenities</h3>
                        {renderFeatureList(location.propertyAmenities)}
                      </div>
                    )}
                    
                    {/* Hotel-specific room features */}
                    {location?.category === "Hotels" && location.roomFeatures && location.roomFeatures.length > 0 && (
                      <div className="mb-6">
                        <h3 className="text-xl font-semibold mb-3">Room Features</h3>
                        {renderFeatureList(location.roomFeatures)}
                      </div>
                    )}
                    
                    {/* Opening Hours section */}
                    {location?.openingHours && (
                      <div>
                        <h3 className="text-xl font-semibold mb-3">Opening Hours</h3>
                        <div className="grid grid-cols-1 gap-2">
                          {Object.entries(location.openingHours)
                            .slice(0, showAllOpeningHours ? Object.keys(location.openingHours).length : 3)
                            .map(([day, hours]: [string, any]) => (
                              <div key={day} className="flex justify-between">
                                <span className="font-medium capitalize">{day}</span>
                                <span>{hours}</span>
                              </div>
                            ))}
                        </div>
                        
                        {Object.keys(location.openingHours).length > 3 && (
                          <Button 
                            variant="ghost" 
                            className="mt-2 text-cluj-primary"
                            onClick={() => setShowAllOpeningHours(!showAllOpeningHours)}
                          >
                            {showAllOpeningHours ? "Show less" : "Show all opening hours"}
                            <ChevronDown className={`h-4 w-4 ml-1 transition-transform ${showAllOpeningHours ? 'rotate-180' : ''}`} />
                          </Button>
                        )}
                      </div>
                    )}
                    
                    {/* Hotel-specific check-in/check-out times */}
                    {location?.checkInTime && location?.checkOutTime && (
                      <div className="mt-6">
                        <h3 className="text-xl font-semibold mb-3">Check-in/Check-out</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <span className="font-medium">Check-in:</span>
                            <span className="ml-2">{location.checkInTime}</span>
                          </div>
                          <div>
                            <span className="font-medium">Check-out:</span>
                            <span className="ml-2">{location.checkOutTime}</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </TabsContent>
                
                <TabsContent value="reviews" className="pt-4">
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Reviews</h3>
                    
                    {location.reviews && location.reviews.length > 0 ? (
                      <div className="space-y-6">
                        {location.reviews.map((review: any) => (
                          <div key={review.id} className="border-b pb-6 last:border-b-0">
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-medium">{review.author}</h4>
                                <div className="flex items-center mt-1">
                                  <div className="flex mr-2">
                                    {renderStars(review.rating)}
                                  </div>
                                  <span className="text-sm text-gray-500">
                                    {formatDate(review.date)}
                                  </span>
                                </div>
                                <div className="mt-1 text-xs text-gray-500">
                                  Source: {review.source}
                                </div>
                              </div>
                            </div>
                            <p className="mt-2 text-gray-700">{review.text}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500">No reviews yet.</p>
                    )}
                  </div>
                </TabsContent>
                
                <TabsContent value="photos" className="pt-4">
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Photos</h3>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {location.photos.map((photo: string, index: number) => (
                        <div key={index} className="h-48 overflow-hidden rounded-md shadow">
                          <img
                            src={photo}
                            alt={`${location.name} - Photo ${index + 1}`}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
                
                {/* Hotel-specific Rooms & Rates tab */}
                {location?.category === "Hotels" && (
                  <TabsContent value="rooms" className="pt-4">
                    <div>
                      <h3 className="text-xl font-semibold mb-4">Rooms & Rates</h3>
                      
                      {location.roomTypes && location.roomTypes.length > 0 ? (
                        <div className="space-y-6">
                          {location.roomTypes.map((roomType: string, index: number) => (
                            <div key={index} className="border rounded-lg overflow-hidden">
                              <div className="flex flex-col md:flex-row">
                                <div className="md:w-1/3 h-48 md:h-auto">
                                  <img 
                                    src={location.photos?.[index % (location.photos.length || 1)] || location.imageUrl} 
                                    alt={roomType}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <div className="p-4 md:w-2/3 flex flex-col justify-between">
                                  <div>
                                    <h4 className="text-lg font-medium mb-2">{roomType}</h4>
                                    <p className="text-gray-700 mb-4">
                                      Experience comfort and luxury in our {roomType.toLowerCase()} rooms.
                                    </p>
                                    
                                    {location.roomFeatures && location.roomFeatures.length > 0 && (
                                      <div className="mb-4">
                                        <h5 className="font-medium mb-1">Room Features:</h5>
                                        <div className="flex flex-wrap gap-x-4 gap-y-1">
                                          {location.roomFeatures.slice(0, 5).map((feature: string, i: number) => (
                                            <span key={i} className="text-sm flex items-center">
                                              <ChevronRight className="h-3 w-3 text-cluj-primary mr-1" />
                                              {feature}
                                            </span>
                                          ))}
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                  
                                  <div className="flex justify-between items-center mt-4">
                                    <div>
                                      <span className="text-lg font-bold text-cluj-primary">
                                        {/* Generate a random price based on index */}
                                        €{80 + (index * 30 + Math.floor(Math.random() * 20))}
                                      </span>
                                      <span className="text-sm text-gray-500"> / night</span>
                                    </div>
                                    <Button>Book Now</Button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-500">Room information not available.</p>
                      )}
                    </div>
                  </TabsContent>
                )}
              </Tabs>
            </div>
            
            {/* Sidebar */}
            <div className="md:w-1/3 mt-8 md:mt-0">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-20">
                <h3 className="text-xl font-semibold mb-4">Location</h3>
                
                <div className="aspect-video bg-gray-200 rounded-md overflow-hidden mb-4">
                  {location?.latitude && location?.longitude ? (
                    <iframe
                      title="Location Map"
                      width="100%"
                      height="100%"
                      frameBorder="0"
                      src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBBLyWj-3FWtCbCXGW3ysEiI2fDfrv2v0Q&q=${location.latitude},${location.longitude}`}
                      allowFullScreen
                    ></iframe>
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-500">Map will be displayed here</span>
                    </div>
                  )}
                </div>
                
                <p className="text-sm text-gray-600 mb-4">{location?.address}</p>
                
                <Button className="w-full" onClick={() => {
                  if (location?.latitude && location?.longitude) {
                    window.open(`https://www.google.com/maps/dir/?api=1&destination=${location.latitude},${location.longitude}`, '_blank');
                  } else {
                    window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location?.address || 'Cluj-Napoca')}`, '_blank');
                  }
                }}>
                  Get Directions
                </Button>
                
                <div className="mt-6">
                  <h3 className="text-xl font-semibold mb-4">Composite Rating</h3>
                  
                  <div className="text-center">
                    <div className="text-3xl font-bold text-cluj-primary mb-1">
                      {location.compositeScore.toFixed(1)}
                    </div>
                    <div className="flex justify-center mb-2">
                      {renderStars(location.compositeScore)}
                    </div>
                    <p className="text-sm text-gray-500">
                      Based on ratings from multiple sources
                    </p>
                  </div>
                  
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Google</span>
                      <div className="flex items-center">
                        <Star className="h-3 w-3 text-yellow-500 fill-yellow-500 mr-1" />
                        <span className="text-sm">{location.googleRating.toFixed(1)}</span>
                      </div>
                    </div>
                    
                    {location.trustpilotRating && (
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Trustpilot</span>
                        <div className="flex items-center">
                          <Star className="h-3 w-3 text-yellow-500 fill-yellow-500 mr-1" />
                          <span className="text-sm">{location.trustpilotRating.toFixed(1)}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    </>
  );
};

export default LocationDetails;
