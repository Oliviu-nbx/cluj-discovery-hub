
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/sonner";
import { CheckIcon, Loader2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";

const BusinessClaim = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);
  
  // This would be fetched from the database in a real app
  const businessData = {
    name: "Sample Business",
    website: "https://example.com",
    domain: "example.com",
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Validate email domain against business website
    const emailDomain = email.split('@')[1];
    if (emailDomain !== businessData.domain) {
      toast.error(`Email must be from ${businessData.domain} domain`);
      setIsSubmitting(false);
      return;
    }
    
    try {
      // In a real app, this would send a verification email through Supabase
      await new Promise(resolve => setTimeout(resolve, 1500));
      setVerificationSent(true);
      toast.success("Verification email sent!");
    } catch (error) {
      console.error("Error sending verification:", error);
      toast.error("There was an error sending the verification email");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <MainLayout>
      <Helmet>
        <title>Claim Your Business | Cluj Compass</title>
        <meta name="description" content="Claim and manage your business listing on Cluj Compass" />
      </Helmet>
      
      <div className="page-container py-12">
        <div className="max-w-lg mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8">Claim Your Business</h1>
          
          <Card>
            <CardHeader>
              <CardTitle>{businessData.name}</CardTitle>
              <CardDescription>
                Verify ownership to manage your business profile
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!verificationSent ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Alert>
                    <AlertTitle>Verification Required</AlertTitle>
                    <AlertDescription>
                      To claim this business, you must verify using an email address
                      from the same domain as the business website ({businessData.website}).
                    </AlertDescription>
                  </Alert>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Business Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder={`your.name@${businessData.domain}`}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <p className="text-xs text-muted-foreground">
                      Must be from the {businessData.domain} domain
                    </p>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Send Verification Email
                  </Button>
                </form>
              ) : (
                <div className="text-center py-4">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100 mb-4">
                    <CheckIcon className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900">Verification Email Sent</h3>
                  <p className="mt-2 text-sm text-gray-500">
                    We've sent a verification email to {email}. 
                    Please check your inbox and follow the instructions to verify and claim your business.
                  </p>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" onClick={() => navigate(`/location/${slug}`)}>
                Back to Business Profile
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default BusinessClaim;
