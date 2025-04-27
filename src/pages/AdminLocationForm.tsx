
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { CheckIcon, Loader2 } from "lucide-react";
import { toast } from "@/components/ui/sonner";

// Form schema for locations
const locationSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  category: z.string().min(1, "Please select a category"),
  website: z.string().url("Please enter a valid URL").optional().or(z.string().length(0)),
  phone: z.string().optional(),
  priceLevel: z.number().min(1).max(4),
});

const AdminLocationForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditing = !!id;
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // In a real app, we would fetch the location data if editing
  const defaultValues = isEditing 
    ? {
        name: "Sample Location",
        address: "123 Sample Street, Cluj-Napoca",
        description: "This is a sample location description.",
        category: "restaurant",
        website: "https://example.com",
        phone: "+40 123 456 789",
        priceLevel: 2,
      }
    : {
        name: "",
        address: "",
        description: "",
        category: "",
        website: "",
        phone: "",
        priceLevel: 2,
      };
  
  const form = useForm<z.infer<typeof locationSchema>>({
    resolver: zodResolver(locationSchema),
    defaultValues,
  });
  
  const onSubmit = async (values: z.infer<typeof locationSchema>) => {
    setIsSubmitting(true);
    try {
      // Here we would interact with Supabase to save the data
      console.log("Form submitted:", values);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success(isEditing ? "Location updated successfully" : "Location created successfully");
      navigate("/admin");
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("There was an error saving the location");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <MainLayout>
      <Helmet>
        <title>{isEditing ? "Edit" : "Add"} Location | Cluj Compass Admin</title>
        <meta name="description" content={`${isEditing ? "Edit" : "Add"} location in Cluj Compass`} />
      </Helmet>
      
      <div className="page-container py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">{isEditing ? "Edit" : "Add New"} Location</h1>
          <Button variant="outline" onClick={() => navigate("/admin")}>
            Cancel
          </Button>
        </div>
        
        <div className="bg-card rounded-lg shadow-sm border p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter location name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <FormControl>
                        <select
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                          {...field}
                        >
                          <option value="">Select category</option>
                          <option value="restaurant">Restaurant</option>
                          <option value="cafe">Cafe</option>
                          <option value="bar">Bar</option>
                          <option value="attraction">Attraction</option>
                          <option value="hotel">Hotel</option>
                          <option value="museum">Museum</option>
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter full address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Enter a detailed description of the location" 
                        className="min-h-[120px]" 
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="website"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Website</FormLabel>
                      <FormControl>
                        <Input placeholder="https://example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="+40 123 456 789" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="priceLevel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price Level</FormLabel>
                    <FormControl>
                      <div className="flex items-center space-x-4">
                        {[1, 2, 3, 4].map((level) => (
                          <label 
                            key={level} 
                            className={`flex items-center justify-center w-12 h-12 rounded-full cursor-pointer border ${
                              field.value === level 
                                ? 'bg-primary text-primary-foreground border-primary' 
                                : 'bg-background hover:bg-muted border-input'
                            }`}
                          >
                            <input
                              type="radio"
                              value={level}
                              checked={field.value === level}
                              onChange={() => field.onChange(level)}
                              className="sr-only"
                            />
                            {"€".repeat(level)}
                          </label>
                        ))}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="pt-4 flex justify-end">
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {isEditing ? "Update Location" : "Create Location"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </MainLayout>
  );
};

export default AdminLocationForm;
