
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
import { Building, MapPin, User, Star } from "lucide-react";

const MyBusinessDashboard = () => {
  // In a real app, this would be fetched from the database
  const businessData = {
    name: "Cluj Cafe",
    address: "123 Main Street, Cluj-Napoca",
    category: "Cafe",
    claimedAt: "2023-10-15",
    rating: 4.7,
    reviewCount: 128,
    viewsThisMonth: 345,
    clicks: 89
  };
  
  return (
    <MainLayout>
      <Helmet>
        <title>My Business | Cluj Compass</title>
        <meta name="description" content="Manage your business on Cluj Compass" />
      </Helmet>
      
      <div className="page-container py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold">{businessData.name}</h1>
            <p className="text-muted-foreground flex items-center mt-1">
              <MapPin className="h-4 w-4 mr-1" />
              {businessData.address}
            </p>
          </div>
          
          <Button asChild>
            <Link to={`/location/${businessData.name.toLowerCase().replace(/\s+/g, '-')}/edit`}>
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
                <div className="text-2xl font-bold">{businessData.rating}</div>
                <span className="text-muted-foreground ml-2">({businessData.reviewCount} reviews)</span>
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
              <div className="text-2xl font-bold">{businessData.viewsThisMonth}</div>
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
              <div className="text-2xl font-bold">{businessData.clicks}</div>
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
              <p className="text-xs text-muted-foreground">Claimed on {businessData.claimedAt}</p>
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
            <Card>
              <CardHeader>
                <CardTitle>Business Profile</CardTitle>
                <CardDescription>
                  Manage your business information and details
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Keep your business details up to date to attract more visitors.
                </p>
                
                <div className="space-y-1">
                  <p className="text-sm font-medium">Features coming soon:</p>
                  <ul className="list-disc list-inside text-sm text-muted-foreground pl-4 space-y-1">
                    <li>Update business hours</li>
                    <li>Add special offers</li>
                    <li>Upload additional photos</li>
                    <li>Create events</li>
                    <li>Edit amenities</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="reviews">
            <Card>
              <CardHeader>
                <CardTitle>Customer Reviews</CardTitle>
                <CardDescription>
                  View and respond to customer reviews
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Review management features coming soon.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="insights">
            <Card>
              <CardHeader>
                <CardTitle>Visitor Insights</CardTitle>
                <CardDescription>
                  Understand how visitors interact with your profile
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Detailed analytics coming soon.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default MyBusinessDashboard;
