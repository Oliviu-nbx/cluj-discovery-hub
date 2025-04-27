
import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log("Contact form submission:", formData);
      
      toast({
        title: "Message Sent",
        description: "Thank you for your message. We'll respond as soon as possible.",
      });
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
      
      setIsLoading(false);
    }, 1000);
  };
  
  return (
    <MainLayout
      title="Contact Us - Cluj Compass"
      description="Get in touch with the Cluj Compass team. We'd love to hear your feedback, answer your questions, or help with any issues."
    >
      <div className="page-container py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">Contact Us</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <p className="text-lg mb-6">
                We'd love to hear from you! Whether you have a question, feedback, or business inquiry, 
                our team is here to help.
              </p>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Email</h3>
                  <p>
                    <a href="mailto:contact@clujcompass.com" className="text-cluj-primary hover:underline">
                      contact@clujcompass.com
                    </a>
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Location</h3>
                  <p>Cluj-Napoca, Romania</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Hours</h3>
                  <p>Our support team is available Monday through Friday, 9:00 AM to 5:00 PM EET.</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Follow Us</h3>
                  <div className="flex space-x-4">
                    {/* Placeholder for social media links */}
                    <a href="#" className="text-cluj-primary hover:text-cluj-secondary">
                      Facebook
                    </a>
                    <a href="#" className="text-cluj-primary hover:text-cluj-secondary">
                      Twitter
                    </a>
                    <a href="#" className="text-cluj-primary hover:text-cluj-secondary">
                      Instagram
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold mb-4">Send Us a Message</h2>
                
                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Name
                      </label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                        Subject
                      </label>
                      <Input
                        id="subject"
                        name="subject"
                        type="text"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                        Message
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? "Sending..." : "Send Message"}
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ContactPage;
