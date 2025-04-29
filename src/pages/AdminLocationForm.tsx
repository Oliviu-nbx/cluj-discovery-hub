
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { useLanguage } from "@/contexts/LanguageContext";

// Form schema for locations with multilingual content
const locationSchema = z.object({
  // Common fields (not language-specific)
  category: z.string().min(1, "Please select a category"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  website: z.string().url("Please enter a valid URL").optional().or(z.string().length(0)),
  phone: z.string().optional(),
  priceLevel: z.number().min(1).max(4),
  
  // English fields
  en: z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    description: z.string().min(10, "Description must be at least 10 characters"),
  }),
  
  // Romanian fields
  ro: z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    description: z.string().min(10, "Description must be at least 10 characters"),
  }),
});

const AdminLocationForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditing = !!id;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<"en" | "ro">("en");
  
  // In a real app, we would fetch the location data if editing
  const defaultValues = isEditing 
    ? {
        category: "restaurant",
        address: "123 Sample Street, Cluj-Napoca",
        website: "https://example.com",
        phone: "+40 123 456 789",
        priceLevel: 2,
        en: {
          name: "Sample Location",
          description: "This is a sample location description.",
        },
        ro: {
          name: "Locație Exemplu",
          description: "Aceasta este o descriere a locației exemplu.",
        }
      }
    : {
        category: "",
        address: "",
        website: "",
        phone: "",
        priceLevel: 2,
        en: {
          name: "",
          description: "",
        },
        ro: {
          name: "",
          description: "",
        }
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

  const copyFromEnglishToRomanian = () => {
    const englishName = form.getValues("en.name");
    const englishDescription = form.getValues("en.description");
    
    form.setValue("ro.name", englishName);
    form.setValue("ro.description", englishDescription);
    
    toast.success("Content copied from English to Romanian");
  };
  
  return (
    <MainLayout>
      <Helmet>
        <title>{isEditing ? t("admin.editLocation") : t("admin.addLocation")} | Cluj Compass Admin</title>
        <meta name="description" content={`${isEditing ? "Edit" : "Add"} location in Cluj Compass`} />
      </Helmet>
      
      <div className="page-container py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">
            {isEditing ? t("admin.editLocation") : t("admin.addLocation")}
          </h1>
          <Button variant="outline" onClick={() => navigate("/admin")}>
            {t("button.cancel")}
          </Button>
        </div>
        
        <div className="bg-card rounded-lg shadow-sm border p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Common Fields Section */}
              <div className="border-b pb-4 mb-6">
                <h2 className="text-xl font-semibold mb-4">Common Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("location.category")}</FormLabel>
                        <FormControl>
                          <select
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                            {...field}
                          >
                            <option value="">{t("location.selectCategory")}</option>
                            <option value="restaurant">{t("category.restaurant")}</option>
                            <option value="cafe">{t("category.cafe")}</option>
                            <option value="bar">{t("category.bar")}</option>
                            <option value="attraction">{t("category.attraction")}</option>
                            <option value="hotel">{t("category.hotel")}</option>
                            <option value="museum">{t("category.museum")}</option>
                            <option value="mall">{t("category.mall")}</option>
                            <option value="gym">{t("category.gym")}</option>
                            <option value="library">{t("category.library")}</option>
                            <option value="bakery">{t("category.bakery")}</option>
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
                      <FormLabel>{t("location.address")}</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter full address" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                  <FormField
                    control={form.control}
                    name="website"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("location.website")}</FormLabel>
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
                        <FormLabel>{t("location.phone")}</FormLabel>
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
                    <FormItem className="mt-4">
                      <FormLabel>{t("location.priceLevel")}</FormLabel>
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
              </div>
              
              {/* Language Tabs Section */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Multilingual Content</h2>
                  {activeTab === "ro" && (
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm"
                      onClick={copyFromEnglishToRomanian}
                    >
                      Copy from English
                    </Button>
                  )}
                </div>
                
                <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "en" | "ro")}>
                  <TabsList className="mb-6">
                    <TabsTrigger value="en">English</TabsTrigger>
                    <TabsTrigger value="ro">Română</TabsTrigger>
                  </TabsList>
                  
                  {/* English Content */}
                  <TabsContent value="en" className="space-y-4">
                    <FormField
                      control={form.control}
                      name="en.name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t("location.name")}</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter location name (English)" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="en.description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t("location.description")}</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Enter a detailed description of the location (English)" 
                              className="min-h-[120px]" 
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </TabsContent>
                  
                  {/* Romanian Content */}
                  <TabsContent value="ro" className="space-y-4">
                    <FormField
                      control={form.control}
                      name="ro.name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t("location.name")}</FormLabel>
                          <FormControl>
                            <Input placeholder="Introduceți numele locației (Română)" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="ro.description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t("location.description")}</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Introduceți o descriere detaliată a locației (Română)" 
                              className="min-h-[120px]" 
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </TabsContent>
                </Tabs>
              </div>
              
              <div className="pt-4 flex justify-end">
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {isEditing ? t("button.update") : t("button.create")}
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
