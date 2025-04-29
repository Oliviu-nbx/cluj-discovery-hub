import { toast } from "@/components/ui/sonner";
import { categories, locations } from "@/data/mockData";

// Types
export interface Location {
  id: string;
  name: string;
  slug: string;
  category: string;
  categoryId: string;
  address: string;
  description: string;
  imageUrl: string;
  photos?: string[];
  rating: number;
  reviewCount: number;
  priceLevel: 1 | 2 | 3 | 4;
  isOpenNow: boolean;
  website?: string;
  phone: string;
  email?: string;
  amenities?: string[];
  openingHours: {
    day: string;
    open: string;
    close: string;
  }[];
  isClaimed: boolean;
  claimedBy?: string;
  latitude?: number;
  longitude?: number;
  reviews?: Review[];
  cuisine?: string[];
  features?: string[];
  meals?: string[];
  specialDiets?: string[];
  price?: string;
  rank?: string;
  awards?: string[];
  neighborhood?: string;
  propertyAmenities?: string[];
  roomFeatures?: string[];
  roomTypes?: string[];
  hotelClass?: string;
  hotelStyle?: string[];
  languages?: string[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  imageUrl: string;
  count: number;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  locationId: string;
  rating: number;
  text: string;
  date: string;
  helpful: number;
}

export interface BusinessClaim {
  id: string;
  businessId: string;
  businessName: string;
  claimedBy: {
    userId: string;
    name: string;
    email: string;
  };
  status: "pending" | "approved" | "rejected";
  submittedAt: string;
  website: string;
}

// Process mock data to make it match the Location interface
const enhancedLocations: Location[] = locations.map(loc => {
  // Convert potential openingHours object to array format required by Location interface
  let formattedOpeningHours = Array.isArray(loc.openingHours) 
    ? loc.openingHours 
    : [
        { day: "Monday", open: "09:00", close: "18:00" },
        { day: "Tuesday", open: "09:00", close: "18:00" },
        { day: "Wednesday", open: "09:00", close: "18:00" },
        { day: "Thursday", open: "09:00", close: "18:00" },
        { day: "Friday", open: "09:00", close: "18:00" },
        { day: "Saturday", open: "10:00", close: "16:00" },
        { day: "Sunday", open: "Closed", close: "Closed" }
      ];

  // Ensure priceLevel is within the allowed values
  const validPriceLevel = (typeof loc.priceLevel === 'number' && loc.priceLevel >= 1 && loc.priceLevel <= 4) 
    ? loc.priceLevel as 1 | 2 | 3 | 4 
    : 2; // Default to 2
  
  // Convert reviews to match the Review interface
  const formattedReviews: Review[] = (loc.reviews || []).map(review => ({
    id: review.id || `review-${Math.random().toString(36).substring(2, 9)}`,
    userId: review.author?.toLowerCase().replace(/\s+/g, '-') || `user-${Math.random().toString(36).substring(2, 9)}`,
    userName: review.author || 'Anonymous',
    locationId: loc.id,
    rating: review.rating,
    text: review.text || '',
    date: review.date || new Date().toISOString(),
    helpful: 0
  }));
    
  // Handle the claimedBy property by using optional chaining and a type guard
  const hasClaimedBy = 'claimedBy' in loc && loc.claimedBy !== undefined && loc.claimedBy !== null;

  return {
    ...loc,
    openingHours: formattedOpeningHours,
    priceLevel: validPriceLevel,
    isClaimed: hasClaimedBy,
    claimedBy: hasClaimedBy ? loc.claimedBy as string : undefined,
    reviews: formattedReviews,
  } as Location;
});

// Mock database (in a real app would be Supabase)
let mockLocations: Location[] = [...enhancedLocations];
let mockCategories = [...categories];
let mockBusinessClaims: BusinessClaim[] = [
  {
    id: "claim-1",
    businessId: "cafe-1",
    businessName: "Cluj Cafe",
    claimedBy: {
      userId: "3",
      name: "Business Owner",
      email: "business@clujcafe.ro"
    },
    status: "approved",
    submittedAt: "2023-10-15",
    website: "clujcafe.ro"
  }
];

// Function to parse XML data
const parseXML = (xmlText: string): Document => {
  const parser = new DOMParser();
  return parser.parseFromString(xmlText, "text/xml");
};

// Function to extract location data from XML
const extractLocationsFromXML = (xmlDoc: Document): Location[] => {
  const items = xmlDoc.querySelectorAll("item");
  const locations: Location[] = [];

  items.forEach((item) => {
    // Helper function to get text content from an element
    const getElementText = (elementName: string): string => {
      const element = item.querySelector(elementName);
      return element ? element.textContent || "" : "";
    };

    // Helper function to get array of values from elements
    const getArrayFromElements = (elementName: string): string[] => {
      const elements = item.querySelectorAll(elementName);
      return Array.from(elements).map(el => el.textContent || "").filter(text => text.length > 0);
    };

    const name = getElementText("name");
    if (!name) return; // Skip items without a name
    
    // Generate a unique ID and slug
    const id = `xml-${name.toLowerCase().replace(/\s+/g, '-')}-${Math.random().toString(36).substring(2, 9)}`;
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    
    // Determine category
    const type = getElementText("type").toLowerCase();
    const category = type.includes("restaurant") || type.includes("cafe") ? 'restaurants' : 
                    type.includes("hotel") ? 'hotels' : 'attractions';
    const categoryObj = mockCategories.find(cat => cat.slug === category);
    
    // Format photos
    const photoUrl = getElementText("photo");
    const photoUrls = getArrayFromElements("photos");
    const allPhotos = photoUrl ? [photoUrl, ...photoUrls] : photoUrls.length > 0 ? photoUrls : ["https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVzdGF1cmFudHxlbnwwfHwwfHx8MA%3D%3D"];
    
    // Process reviews
    const reviewElements = item.querySelectorAll("reviews > review");
    const reviews: Review[] = Array.from(reviewElements).map((reviewEl, index) => {
      const reviewText = reviewEl.querySelector("text")?.textContent || "";
      const reviewAuthor = reviewEl.querySelector("author")?.textContent || "Anonymous";
      const reviewRating = parseFloat(reviewEl.querySelector("rating")?.textContent || "4");
      const reviewDate = reviewEl.querySelector("date")?.textContent || new Date().toISOString();
      
      return {
        id: `review-${id}-${index}`,
        userId: `user-${reviewAuthor.toLowerCase().replace(/\s+/g, '-')}`,
        userName: reviewAuthor,
        locationId: id,
        rating: reviewRating,
        text: reviewText,
        date: reviewDate,
        helpful: 0
      };
    });
    
    // Calculate rating
    const reviewCount = reviews.length;
    const rating = reviewCount > 0 
      ? parseFloat((reviews.reduce((sum, review) => sum + review.rating, 0) / reviewCount).toFixed(1))
      : parseFloat(getElementText("rating") || "4");
    
    // Convert hotelStyle from string[] to string[] (this is where the error was)
    const hotelStyleArray = getArrayFromElements("hotelStyle");
    
    // Create location object
    const location: Location = {
      id,
      name,
      slug,
      category: category === 'restaurants' ? 'Restaurants' : 
              category === 'hotels' ? 'Hotels' : 'Attractions',
      categoryId: categoryObj?.id || 'category-1',
      address: getElementText("address") || 'Cluj-Napoca, Romania',
      description: getElementText("description") || getElementText("about") || '',
      imageUrl: allPhotos[0],
      photos: allPhotos,
      rating,
      reviewCount: reviewCount || parseInt(getElementText("reviewCount") || "0"),
      priceLevel: getElementText("priceRange") === '$$$$' ? 4 : 
                getElementText("priceRange") === '$$$' ? 3 : 
                getElementText("priceRange") === '$$' ? 2 : 1,
      isOpenNow: true, // Default to open
      website: getElementText("website") || '',
      phone: getElementText("phone") || '+40 264 000 000',
      email: getElementText("email") || '',
      amenities: getArrayFromElements("amenities"),
      openingHours: [
        { day: "Monday", open: "09:00", close: "23:00" },
        { day: "Tuesday", open: "09:00", close: "23:00" },
        { day: "Wednesday", open: "09:00", close: "23:00" },
        { day: "Thursday", open: "09:00", close: "23:00" },
        { day: "Friday", open: "09:00", close: "23:00" },
        { day: "Saturday", open: "10:00", close: "23:00" },
        { day: "Sunday", open: "10:00", close: "22:00" }
      ],
      isClaimed: false,
      latitude: parseFloat(getElementText("latitude") || "0"),
      longitude: parseFloat(getElementText("longitude") || "0"),
      reviews,
      cuisine: getArrayFromElements("cuisine"),
      features: getArrayFromElements("features"),
      meals: getArrayFromElements("meals"),
      specialDiets: getArrayFromElements("specialDiets"),
      price: getElementText("price") || getElementText("priceRange") || '',
      rank: getElementText("rank") || '',
      awards: getArrayFromElements("awards"),
      neighborhood: getElementText("neighborhood") || 'Cluj-Napoca',
      propertyAmenities: getArrayFromElements("propertyAmenities"),
      roomFeatures: getArrayFromElements("roomFeatures"),
      roomTypes: getArrayFromElements("roomTypes"),
      hotelClass: getElementText("hotelClass") || '',
      hotelStyle: hotelStyleArray, // Fixed: Now correctly passing the array
      languages: getArrayFromElements("languages").length > 0 ? getArrayFromElements("languages") : ['Romanian', 'English']
    };
    
    locations.push(location);
  });

  return locations;
};

// Function to fetch XML data from the GitHub repository
export const fetchXMLLocations = async (): Promise<void> => {
  try {
    const response = await fetch('https://raw.githubusercontent.com/Oliviu-nbx/cluj-location-explorer/main/dataset_crawler-google-places_2025-04-29_07-32-12-890.xml');
    if (!response.ok) {
      throw new Error('Failed to fetch XML data');
    }
    
    const xmlText = await response.text();
    const xmlDoc = parseXML(xmlText);
    const newLocations = extractLocationsFromXML(xmlDoc);
    
    // Filter out any duplicates by name
    const existingNames = new Set(mockLocations.map(loc => loc.name.toLowerCase()));
    const uniqueNewLocations = newLocations.filter(loc => !existingNames.has(loc.name.toLowerCase()));
    
    // Update our mock database
    mockLocations = [...mockLocations, ...uniqueNewLocations];
    
    // Update category counts
    mockCategories = mockCategories.map(category => {
      const count = mockLocations.filter(loc => 
        loc.categoryId === category.id || 
        (loc.category.toLowerCase() === category.slug)
      ).length;
      return { ...category, count };
    });
    
    toast.success(`Added ${uniqueNewLocations.length} new locations from XML data`);
  } catch (error) {
    console.error('Error fetching XML data:', error);
    toast.error('Failed to fetch XML location data');
  }
};

// Function to fetch external data and merge it with our existing data
export const fetchAndUpdateLocations = async (): Promise<void> => {
  try {
    const response = await fetch('https://api.apify.com/v2/datasets/8Z0o9BS1iBLzCzxZZ/items?clean=true&format=json');
    if (!response.ok) {
      throw new Error('Failed to fetch external data');
    }
    const externalData = await response.json();
    
    // Process and merge the data
    const newLocations: Location[] = externalData.map((item: any) => {
      // Generate a unique ID and slug
      const id = `ext-${item.name?.toLowerCase().replace(/\s+/g, '-')}-${Math.random().toString(36).substring(2, 9)}`;
      const slug = item.name?.toLowerCase().replace(/[^a-z0-9]+/g, '-') || id;
      
      // Determine category
      const category = item.type === 'restaurant' ? 'restaurants' : 
                      (item.type === 'hotel' ? 'hotels' : 'attractions');
      const categoryObj = mockCategories.find(cat => cat.slug === category);
      
      // Format opening hours
      const defaultOpeningHours = [
        { day: "Monday", open: "09:00", close: "23:00" },
        { day: "Tuesday", open: "09:00", close: "23:00" },
        { day: "Wednesday", open: "09:00", close: "23:00" },
        { day: "Thursday", open: "09:00", close: "23:00" },
        { day: "Friday", open: "09:00", close: "23:00" },
        { day: "Saturday", open: "10:00", close: "23:00" },
        { day: "Sunday", open: "10:00", close: "22:00" }
      ];
      
      // Process reviews
      const reviews = item.reviews?.map((review: any, index: number) => ({
        id: `review-${id}-${index}`,
        userId: `user-${Math.random().toString(36).substring(2, 9)}`,
        userName: review.username || 'Anonymous',
        locationId: id,
        rating: review.rating || 4,
        text: review.text || '',
        date: review.date || new Date().toISOString(),
        helpful: 0
      })) || [];
      
      // Default image if none provided
      const defaultImage = 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVzdGF1cmFudHxlbnwwfHwwfHx8MA%3D%3D';
      
      // Create a location object from the external data
      return {
        id,
        name: item.name || 'Unnamed Location',
        slug,
        category: item.type === 'restaurant' ? 'Restaurants' : 
                (item.type === 'hotel' ? 'Hotels' : 'Attractions'),
        categoryId: categoryObj?.id || 'category-1',
        address: item.address || 'Cluj-Napoca, Romania',
        description: item.description || item.about || '',
        imageUrl: item.photo || defaultImage,
        photos: item.photos || [defaultImage],
        rating: item.rating || 4.0,
        reviewCount: item.reviewCount || reviews.length || 0,
        priceLevel: item.priceRange === '$$$$' ? 4 : 
                    item.priceRange === '$$$' ? 3 : 
                    item.priceRange === '$$' ? 2 : 1,
        isOpenNow: true, // Default to open
        website: item.website || '',
        phone: item.phone || '+40 264 000 000',
        email: item.email || '',
        amenities: item.features || item.amenities || [],
        openingHours: defaultOpeningHours,
        isClaimed: false,
        latitude: item.latitude,
        longitude: item.longitude,
        reviews,
        cuisine: item.cuisine || [],
        features: item.features || [],
        meals: item.meals || [],
        specialDiets: item.specialDiets || [],
        price: item.price || item.priceRange || '',
        rank: item.rank || '',
        awards: item.awards || [],
        neighborhood: item.neighborhood || 'Cluj-Napoca',
        propertyAmenities: item.propertyAmenities || [],
        roomFeatures: item.roomFeatures || [],
        roomTypes: item.roomTypes || [],
        hotelClass: item.hotelClass || '',
        hotelStyle: item.hotelStyle || [],
        languages: item.languages || ['Romanian', 'English']
      } as Location;
    });
    
    // Filter out any duplicates by name
    const existingNames = new Set(mockLocations.map(loc => loc.name.toLowerCase()));
    const uniqueNewLocations = newLocations.filter(loc => !existingNames.has(loc.name.toLowerCase()));
    
    // Update our mock database
    mockLocations = [...mockLocations, ...uniqueNewLocations];
    
    // Update category counts
    mockCategories = mockCategories.map(category => {
      const count = mockLocations.filter(loc => 
        loc.categoryId === category.id || 
        (loc.category.toLowerCase() === category.slug)
      ).length;
      return { ...category, count };
    });
    
    toast.success(`Added ${uniqueNewLocations.length} new locations from external data`);
  } catch (error) {
    console.error('Error fetching external data:', error);
    toast.error('Failed to fetch external location data');
  }
};

// Simulated API delays
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Location Services
export const getLocations = async (): Promise<Location[]> => {
  await delay(500);
  return mockLocations;
};

export const getLocationById = async (id: string): Promise<Location | null> => {
  await delay(300);
  return mockLocations.find(loc => loc.id === id) || null;
};

export const getLocationBySlug = async (slug: string): Promise<Location | null> => {
  await delay(300);
  return mockLocations.find(loc => loc.slug === slug) || null;
};

export const createLocation = async (locationData: Omit<Location, "id" | "slug" | "isClaimed" | "reviews" | "reviewCount" | "rating">): Promise<Location> => {
  await delay(800);
  
  // Generate ID and slug
  const id = `loc-${Date.now()}`;
  const slug = locationData.name.toLowerCase().replace(/\s+/g, '-');
  
  const newLocation: Location = {
    ...locationData,
    id,
    slug,
    reviewCount: 0,
    rating: 0,
    isClaimed: false,
    reviews: []
  };
  
  mockLocations = [...mockLocations, newLocation];
  
  // Update category count
  const categoryIndex = mockCategories.findIndex(cat => cat.id === locationData.categoryId);
  if (categoryIndex !== -1) {
    mockCategories[categoryIndex] = {
      ...mockCategories[categoryIndex],
      count: mockCategories[categoryIndex].count + 1
    };
  }
  
  toast.success("Location created successfully");
  return newLocation;
};

export const updateLocation = async (id: string, locationData: Partial<Location>): Promise<Location> => {
  await delay(800);
  
  const index = mockLocations.findIndex(loc => loc.id === id);
  
  if (index === -1) {
    throw new Error("Location not found");
  }
  
  // If category changed, update counts
  if (locationData.categoryId && locationData.categoryId !== mockLocations[index].categoryId) {
    // Decrease old category count
    const oldCategoryIndex = mockCategories.findIndex(cat => cat.id === mockLocations[index].categoryId);
    if (oldCategoryIndex !== -1) {
      mockCategories[oldCategoryIndex] = {
        ...mockCategories[oldCategoryIndex],
        count: Math.max(0, mockCategories[oldCategoryIndex].count - 1)
      };
    }
    
    // Increase new category count
    const newCategoryIndex = mockCategories.findIndex(cat => cat.id === locationData.categoryId);
    if (newCategoryIndex !== -1) {
      mockCategories[newCategoryIndex] = {
        ...mockCategories[newCategoryIndex],
        count: mockCategories[newCategoryIndex].count + 1
      };
    }
  }
  
  const updatedLocation = {
    ...mockLocations[index],
    ...locationData
  };
  
  mockLocations[index] = updatedLocation;
  toast.success("Location updated successfully");
  return updatedLocation;
};

export const deleteLocation = async (id: string): Promise<void> => {
  await delay(600);
  
  const location = mockLocations.find(loc => loc.id === id);
  
  if (!location) {
    throw new Error("Location not found");
  }
  
  // Update category count
  const categoryIndex = mockCategories.findIndex(cat => cat.id === location.categoryId);
  if (categoryIndex !== -1) {
    mockCategories[categoryIndex] = {
      ...mockCategories[categoryIndex],
      count: Math.max(0, mockCategories[categoryIndex].count - 1)
    };
  }
  
  mockLocations = mockLocations.filter(loc => loc.id !== id);
  toast.success("Location deleted successfully");
};

// Category Services
export const getCategories = async (): Promise<Category[]> => {
  await delay(300);
  return mockCategories;
};

export const getCategoryBySlug = async (slug: string): Promise<Category | null> => {
  await delay(200);
  return mockCategories.find(cat => cat.slug === slug) || null;
};

export const getLocationsByCategory = async (categoryId: string): Promise<Location[]> => {
  await delay(500);
  return mockLocations.filter(loc => loc.categoryId === categoryId);
};

// Business Claim Services
export const submitBusinessClaim = async (
  businessId: string, 
  userId: string, 
  userName: string,
  userEmail: string, 
  website: string
): Promise<BusinessClaim> => {
  await delay(1000);
  
  // Find the business
  const business = mockLocations.find(loc => loc.id === businessId);
  
  if (!business) {
    throw new Error("Business not found");
  }
  
  // Check if already claimed
  if (business.isClaimed) {
    throw new Error("Business has already been claimed");
  }
  
  // Check if a pending claim exists
  const existingClaim = mockBusinessClaims.find(
    claim => claim.businessId === businessId && claim.status === "pending"
  );
  
  if (existingClaim) {
    throw new Error("A pending claim already exists for this business");
  }
  
  // Create new claim
  const newClaim: BusinessClaim = {
    id: `claim-${Date.now()}`,
    businessId,
    businessName: business.name,
    claimedBy: {
      userId,
      name: userName,
      email: userEmail
    },
    status: "pending",
    submittedAt: new Date().toISOString(),
    website
  };
  
  mockBusinessClaims.push(newClaim);
  return newClaim;
};

export const verifyBusinessClaim = async (claimId: string, status: "approved" | "rejected"): Promise<BusinessClaim> => {
  await delay(800);
  
  const claimIndex = mockBusinessClaims.findIndex(claim => claim.id === claimId);
  
  if (claimIndex === -1) {
    throw new Error("Claim not found");
  }
  
  const updatedClaim = {
    ...mockBusinessClaims[claimIndex],
    status
  };
  
  mockBusinessClaims[claimIndex] = updatedClaim;
  
  // If approved, update the business
  if (status === "approved") {
    const businessIndex = mockLocations.findIndex(loc => loc.id === updatedClaim.businessId);
    
    if (businessIndex !== -1) {
      mockLocations[businessIndex] = {
        ...mockLocations[businessIndex],
        isClaimed: true,
        claimedBy: updatedClaim.claimedBy.userId,
        website: updatedClaim.website
      };
    }
  }
  
  return updatedClaim;
};

export const getBusinessClaimsByStatus = async (status?: "pending" | "approved" | "rejected"): Promise<BusinessClaim[]> => {
  await delay(500);
  
  if (status) {
    return mockBusinessClaims.filter(claim => claim.status === status);
  }
  
  return mockBusinessClaims;
};

export const getBusinessClaimById = async (claimId: string): Promise<BusinessClaim | null> => {
  await delay(300);
  return mockBusinessClaims.find(claim => claim.id === claimId) || null;
};

export const getBusinessClaimByBusinessId = async (businessId: string): Promise<BusinessClaim | null> => {
  await delay(300);
  return mockBusinessClaims.find(claim => claim.businessId === businessId) || null;
};

// Reviews
export const addReview = async (review: Omit<Review, "id" | "date">): Promise<Review> => {
  await delay(800);
  
  const newReview: Review = {
    ...review,
    id: `review-${Date.now()}`,
    date: new Date().toISOString(),
    helpful: 0
  };
  
  // Find the location
  const locationIndex = mockLocations.findIndex(loc => loc.id === review.locationId);
  
  if (locationIndex === -1) {
    throw new Error("Location not found");
  }
  
  // Add review to location
  const location = mockLocations[locationIndex];
  const reviews = location.reviews || [];
  reviews.push(newReview);
  
  // Recalculate rating
  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
  const newRating = parseFloat((totalRating / reviews.length).toFixed(1));
  
  // Update location
  mockLocations[locationIndex] = {
    ...location,
    reviews,
    rating: newRating,
    reviewCount: reviews.length
  };
  
  toast.success("Review added successfully");
  return newReview;
};

export const getReviewsByLocationId = async (locationId: string): Promise<Review[]> => {
  await delay(500);
  
  const location = mockLocations.find(loc => loc.id === locationId);
  return location?.reviews || [];
};
