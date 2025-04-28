
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Building, MapPin, User, Star, Loader2 } from "lucide-react";
import { toast } from "@/components/ui/sonner";
import { useAuth } from "@/components/auth/AuthProvider";
import { getLocations, Location } from "@/services/dataService";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const MyBusinessDashboard = () => {
  const { user } = useAuth();
  const [business, setBusiness] = useState<Location | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [viewsThisMonth] = useState(345); // Mock data
  const [clicks] = useState(89); // Mock data
  
  useEffect(() => {
    const fetchBusinessData = async () => {
      if (!user?.businessId) {
        setIsLoading(false);
        return;
      }
      
      try {
        const locations = await getLocations();
        const userBusiness = locations.find(loc => 
          loc.isClaimed && loc.claimedBy === user.id
        );
        
        if (userBusiness) {
          setBusiness(userBusiness);
        }
      } catch (error) {
        toast.error("Error loading business data");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchBusinessData();
  }, [user]);
  
  if (isLoading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="h-8 w-8 animate-spin text-cluj-primary" />
          <span className="ml-2">Loading business information...</span>
        </div>
      </MainLayout>
    );
  }
  
  if (!business) {
    return (
      <MainLayout>
        <Helmet>
          <title>My Business | Cluj Compass</title>
          <meta name="description" content="Manage your business on Cluj Compass" />
        </Helmet>
        
        <div className="page-container py-12">
          <div className="max-w-md mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>No Business Found</CardTitle>
                <CardDescription>
                  You haven't claimed any businesses yet.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>To claim a business, visit the business page and click the "Claim this Business" button.</p>
                <Button asChild className="w-full">
                  <Link to="/categories">Browse Businesses</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </MainLayout>
    );
  }
  
  return (
    <MainLayout>
      <Helmet>
        <title>My Business | Cluj Compass</title>
        <meta name="description" content="Manage your business on Cluj Compass" />
      </Helmet>
      
      <div className="page-container py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold">{business.name}</h1>
            <p className="text-muted-foreground flex items-center mt-1">
              <MapPin className="h-4 w-4 mr-1" />
              {business.address}
            </p>
          </div>
          
          <Button asChild>
            <Link to={`/location/${business.slug}/edit`}>
              Edit Business Profile
            </Link>
          </Button>
        </div>
        
        {/* Analytics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Rating
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-2" />
                <div className="text-2xl font-bold">{business.rating}</div>
                <span className="text-muted-foreground ml-2">({business.reviewCount} reviews)</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Profile Views
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{viewsThisMonth}</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Website Clicks
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{clicks}</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <div className="h-3 w-3 rounded-full bg-green-500 mr-2"></div>
                <span className="font-medium">Verified</span>
              </div>
              <p className="text-xs text-muted-foreground">Claimed on {new Date().toLocaleDateString()}</p>
            </CardContent>
          </Card>
        </div>
        
        {/* Tab Navigation */}
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="mb-8">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <Building className="h-4 w-4" />
              <span>Business Profile</span>
            </TabsTrigger>
            <TabsTrigger value="reviews" className="flex items-center gap-2">
              <Star className="h-4 w-4" />
              <span>Reviews</span>
            </TabsTrigger>
            <TabsTrigger value="insights" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>Visitor Insights</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile">
            <BusinessProfileTab business={business} />
          </TabsContent>
          
          <TabsContent value="reviews">
            <ReviewsTab business={business} />
          </TabsContent>
          
          <TabsContent value="insights">
            <InsightsTab business={business} />
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

// Business Profile Tab
const BusinessProfileTab = ({ business }: { business: Location }) => {
  const [description, setDescription] = useState(business.description);
  const [isUpdating, setIsUpdating] = useState(false);
  
  const handleUpdateProfile = async () => {
    setIsUpdating(true);
    
    // Mock API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast.success("Profile updated successfully");
    setIsUpdating(false);
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Business Information</CardTitle>
          <CardDescription>
            Update your business details
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="description">Business Description</Label>
            <Textarea 
              id="description" 
              value={description} 
              onChange={(e) => setDescription(e.target.value)}
              rows={6}
            />
            <p className="text-xs text-muted-foreground">
              Tell visitors about your business, services, and unique features
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" defaultValue={business.phone} />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="website">Website</Label>
              <Input id="website" defaultValue={business.website} />
            </div>
          </div>
          
          <Button onClick={handleUpdateProfile} disabled={isUpdating}>
            {isUpdating ? "Updating..." : "Save Changes"}
          </Button>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Business Hours</CardTitle>
          <CardDescription>
            Set your operating hours
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {business.openingHours.map((hour, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="font-medium w-24">{hour.day}</span>
                <div className="flex items-center gap-2">
                  <Input className="w-24" defaultValue={hour.open} />
                  <span>to</span>
                  <Input className="w-24" defaultValue={hour.close} />
                </div>
              </div>
            ))}
            
            <Button className="mt-4">Save Hours</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Reviews Tab
const ReviewsTab = ({ business }: { business: Location }) => {
  const reviews = business.reviews || [];
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Customer Reviews</CardTitle>
        <CardDescription>
          View and respond to customer reviews
        </CardDescription>
      </CardHeader>
      <CardContent>
        {reviews.length > 0 ? (
          <div className="space-y-6">
            {reviews.map((review) => (
              <div key={review.id} className="border-b pb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{review.userName}</span>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i}
                            className={`h-4 w-4 ${i < review.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {new Date(review.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <p className="mt-2">{review.text}</p>
                <div className="mt-4">
                  <Button variant="outline" size="sm">Reply</Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">
            No reviews yet. Reviews will appear here when customers leave feedback.
          </p>
        )}
      </CardContent>
    </Card>
  );
};

// Insights Tab
const InsightsTab = ({ business }: { business: Location }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Visitor Insights</CardTitle>
        <CardDescription>
          Understand how visitors interact with your profile
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="border rounded-lg p-6">
            <h3 className="text-lg font-medium mb-4">Visitor Demographics</h3>
            <p className="text-muted-foreground">
              Detailed analytics will be available soon. Check back later for insights on your visitors.
            </p>
          </div>
          
          <div className="border rounded-lg p-6">
            <h3 className="text-lg font-medium mb-4">Traffic Sources</h3>
            <p className="text-muted-foreground">
              Learn where your visitors are coming from to optimize your online presence.
            </p>
            <div className="mt-4">
              <Button variant="outline">Enable Extended Analytics</Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MyBusinessDashboard;
