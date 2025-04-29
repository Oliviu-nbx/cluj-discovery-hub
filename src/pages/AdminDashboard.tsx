
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building, MapPin, Shield, Loader2, Trash2, CheckCircle, XCircle } from "lucide-react";
import { toast } from "@/components/ui/sonner";
import { useLanguage } from "@/contexts/LanguageContext";
import { 
  getLocations, 
  getBusinessClaimsByStatus, 
  verifyBusinessClaim,
  deleteLocation,
  Location,
  BusinessClaim
} from "@/services/dataService";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("locations");
  const { t } = useLanguage();
  
  return (
    <MainLayout>
      <Helmet>
        <title>{t("admin.dashboard")} | Cluj Compass</title>
        <meta name="description" content="Admin dashboard for Cluj Compass" />
      </Helmet>

      <div className="page-container py-8">
        <h1 className="text-3xl font-bold mb-6">{t("admin.dashboard")}</h1>
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-8">
            <TabsTrigger value="locations" className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>{t("admin.locations")}</span>
            </TabsTrigger>
            <TabsTrigger value="claims" className="flex items-center gap-2">
              <Building className="h-4 w-4" />
              <span>{t("admin.claims")}</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span>{t("admin.settings")}</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="locations">
            <LocationsManagement />
          </TabsContent>
          
          <TabsContent value="claims">
            <ClaimsManagement />
          </TabsContent>
          
          <TabsContent value="settings">
            <AdminSettings />
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

// Locations Management Tab Content
const LocationsManagement = () => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [locationToDelete, setLocationToDelete] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { t } = useLanguage();
  
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const data = await getLocations();
        setLocations(data);
      } catch (error) {
        toast.error("Error loading locations");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchLocations();
  }, []);
  
  const handleDeleteLocation = async () => {
    if (!locationToDelete) return;
    
    setIsDeleting(true);
    try {
      await deleteLocation(locationToDelete);
      setLocations(locations.filter(loc => loc.id !== locationToDelete));
      setDialogOpen(false);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Error deleting location");
      }
    } finally {
      setIsDeleting(false);
      setLocationToDelete(null);
    }
  };
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">{t("admin.locations")}</h2>
        <Link to="/admin/locations/add">
          <Button>{t("admin.addLocation")}</Button>
        </Link>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-cluj-primary" />
        </div>
      ) : (
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t("location.name")}</TableHead>
                <TableHead>{t("location.category")}</TableHead>
                <TableHead>{t("location.address")}</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Claimed</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {locations.map((location) => (
                <TableRow key={location.id}>
                  <TableCell className="font-medium">{location.name}</TableCell>
                  <TableCell>{t(`category.${location.category}`)}</TableCell>
                  <TableCell>{location.address}</TableCell>
                  <TableCell>
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Active
                    </span>
                  </TableCell>
                  <TableCell>{location.isClaimed ? "Yes" : "No"}</TableCell>
                  <TableCell className="text-right">
                    <Link 
                      to={`/admin/locations/edit/${location.id}`}
                      className="text-indigo-600 hover:text-indigo-900 mr-4"
                    >
                      {t("admin.editLocation")}
                    </Link>
                    <Button
                      variant="ghost"
                      className="text-red-600 hover:text-red-900 p-0 h-auto"
                      onClick={() => {
                        setLocationToDelete(location.id);
                        setDialogOpen(true);
                      }}
                    >
                      {t("admin.deleteLocation")}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              
              {locations.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    No locations found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}
      
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              {t("admin.confirmDelete")}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)} disabled={isDeleting}>
              {t("button.cancel")}
            </Button>
            <Button variant="destructive" onClick={handleDeleteLocation} disabled={isDeleting}>
              {isDeleting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2 className="mr-2 h-4 w-4" />
                  {t("button.delete")}
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

// Claims Management Tab Content
const ClaimsManagement = () => {
  const [claims, setClaims] = useState<BusinessClaim[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [processingClaimId, setProcessingClaimId] = useState<string | null>(null);
  const { t } = useLanguage();
  
  useEffect(() => {
    const fetchClaims = async () => {
      try {
        const data = await getBusinessClaimsByStatus("pending");
        setClaims(data);
      } catch (error) {
        toast.error("Error loading claims");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchClaims();
  }, []);
  
  const handleClaimAction = async (claimId: string, action: "approved" | "rejected") => {
    setProcessingClaimId(claimId);
    
    try {
      await verifyBusinessClaim(claimId, action);
      setClaims(claims.filter(claim => claim.id !== claimId));
      
      toast.success(
        action === "approved" 
          ? "Business claim approved successfully" 
          : "Business claim rejected"
      );
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Error processing claim");
      }
    } finally {
      setProcessingClaimId(null);
    }
  };
  
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">{t("admin.claims")}</h2>
      
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-cluj-primary" />
        </div>
      ) : (
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Business</TableHead>
                <TableHead>Claimed By</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Submitted On</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {claims.map((claim) => (
                <TableRow key={claim.id}>
                  <TableCell className="font-medium">{claim.businessName}</TableCell>
                  <TableCell>{claim.claimedBy.name}</TableCell>
                  <TableCell>{claim.claimedBy.email}</TableCell>
                  <TableCell>{new Date(claim.submittedAt).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                      Pending
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      className="text-green-600 hover:text-green-900 mr-4"
                      disabled={!!processingClaimId}
                      onClick={() => handleClaimAction(claim.id, "approved")}
                    >
                      {processingClaimId === claim.id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <CheckCircle className="h-4 w-4 mr-1" />
                      )}
                      {t("button.approve")}
                    </Button>
                    <Button
                      variant="ghost"
                      className="text-red-600 hover:text-red-900"
                      disabled={!!processingClaimId}
                      onClick={() => handleClaimAction(claim.id, "rejected")}
                    >
                      {processingClaimId === claim.id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <XCircle className="h-4 w-4 mr-1" />
                      )}
                      {t("button.reject")}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              
              {claims.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    No pending claims found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

// Admin Settings Tab Content
const AdminSettings = () => {
  const { t } = useLanguage();
  
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">{t("admin.settings")}</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border rounded-lg p-6">
          <h3 className="text-lg font-medium mb-4">General Settings</h3>
          <p className="text-muted-foreground mb-4">
            Configure admin panel settings and permissions.
          </p>
          <Button variant="outline">Manage User Roles</Button>
        </div>
        
        <div className="border rounded-lg p-6">
          <h3 className="text-lg font-medium mb-4">Email Notifications</h3>
          <p className="text-muted-foreground mb-4">
            Configure when and to whom notification emails are sent.
          </p>
          <Button variant="outline">Configure Notifications</Button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
