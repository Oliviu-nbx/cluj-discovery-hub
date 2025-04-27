
import { Link } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";

const NotFoundLocation = () => {
  return (
    <MainLayout
      title="Location Not Found - Cluj Compass"
      description="The location you're looking for could not be found on Cluj Compass."
    >
      <div className="page-container">
        <div className="flex flex-col items-center justify-center py-20">
          <div className="text-cluj-primary mb-6">
            <MapPin className="h-16 w-16" />
          </div>
          
          <h1 className="text-3xl font-bold mb-2">Location Not Found</h1>
          <p className="text-xl text-gray-600 mb-8 text-center">
            We couldn't find the location you're looking for.
            <br />
            It may have been removed or the URL might be incorrect.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild>
              <Link to="/">Return to Home</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/categories">Browse Categories</Link>
            </Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default NotFoundLocation;
