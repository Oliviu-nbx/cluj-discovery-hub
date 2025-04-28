
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
  gallery?: string[];
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
    
  return {
    ...loc,
    openingHours: formattedOpeningHours,
    priceLevel: validPriceLevel,
    isClaimed: Boolean(loc.claimedBy || false),
    reviews: loc.reviews || []
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
