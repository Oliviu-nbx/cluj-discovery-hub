
import { Helmet } from "react-helmet-async";
import { Link, Outlet } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building, MapPin, Shield } from "lucide-react";

const AdminDashboard = () => {
  return (
    <MainLayout>
      <Helmet>
        <title>Admin Dashboard | Cluj Compass</title>
        <meta name="description" content="Admin dashboard for Cluj Compass" />
      </Helmet>

      <div className="page-container py-8">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
        
        <Tabs defaultValue="locations" className="w-full">
          <TabsList className="mb-8">
            <TabsTrigger value="locations" className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>Locations</span>
            </TabsTrigger>
            <TabsTrigger value="claims" className="flex items-center gap-2">
              <Building className="h-4 w-4" />
              <span>Business Claims</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span>Admin Settings</span>
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
      
      <Outlet />
    </MainLayout>
  );
};

// Locations Management Tab Content
const LocationsManagement = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Manage Locations</h2>
        <Link to="/admin/locations/add">
          <Button>Add New Location</Button>
        </Link>
      </div>
      
      <LocationsTable />
    </div>
  );
};

// Claims Management Tab Content
const ClaimsManagement = () => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Business Claim Requests</h2>
      <ClaimsTable />
    </div>
  );
};

// Admin Settings Tab Content
const AdminSettings = () => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Admin Settings</h2>
      <p className="text-muted-foreground">Configure admin panel settings and permissions.</p>
    </div>
  );
};

// Placeholder for the Locations Table
const LocationsTable = () => {
  // This would fetch data from Supabase in a real implementation
  return (
    <div className="border rounded-lg overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Claimed</th>
            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {/* Sample row - would be mapped from actual data */}
          <tr>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm font-medium text-gray-900">Samsara Foodhouse</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-gray-500">Restaurant</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Active</span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">No</td>
            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <Link to="/admin/locations/edit/1" className="text-indigo-600 hover:text-indigo-900 mr-4">Edit</Link>
              <button className="text-red-600 hover:text-red-900">Delete</button>
            </td>
          </tr>
          <tr>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm font-medium text-gray-900">Joben Bistro</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-gray-500">Cafe</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Active</span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Yes</td>
            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <Link to="/admin/locations/edit/2" className="text-indigo-600 hover:text-indigo-900 mr-4">Edit</Link>
              <button className="text-red-600 hover:text-red-900">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

// Placeholder for the Claims Table
const ClaimsTable = () => {
  return (
    <div className="border rounded-lg overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Business</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Claimed By</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          <tr>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm font-medium text-gray-900">Cluj Cafe</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-gray-500">John Smith</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-gray-500">john@clujcafe.ro</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">Pending</span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <button className="text-green-600 hover:text-green-900 mr-4">Approve</button>
              <button className="text-red-600 hover:text-red-900">Reject</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
