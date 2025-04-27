
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const AboutPage = () => {
  return (
    <MainLayout
      title="About Cluj Compass - Discover Cluj-Napoca"
      description="Learn about Cluj Compass, your ultimate guide to discovering the best places in Cluj-Napoca, Romania."
    >
      <div className="page-container py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">About Cluj Compass</h1>
          
          <div className="prose max-w-none">
            <p className="text-lg mb-6">
              Cluj Compass is your ultimate guide to discovering the best places in Cluj-Napoca, Romania. 
              Whether you're a local resident, a student, or a visitor, our platform helps you 
              find the most interesting locations throughout the city.
            </p>
            
            <h2 className="text-2xl font-semibold mt-10 mb-4">Our Mission</h2>
            <p>
              We aim to create the most comprehensive and user-friendly guide to Cluj-Napoca, 
              connecting people with great local businesses, attractions, and hidden gems. 
              By providing reliable information and authentic reviews, we help you make 
              informed decisions about where to eat, drink, relax, and explore.
            </p>
            
            <h2 className="text-2xl font-semibold mt-10 mb-4">What Makes Us Different</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Local Focus:</strong> We're exclusively focused on Cluj-Napoca, providing deep local knowledge.
              </li>
              <li>
                <strong>Composite Ratings:</strong> Our unique algorithm combines ratings from multiple trusted sources.
              </li>
              <li>
                <strong>Comprehensive Information:</strong> We provide detailed information about each location, from opening hours to amenities.
              </li>
              <li>
                <strong>User-Friendly Experience:</strong> Our platform is designed to be intuitive and easy to use.
              </li>
            </ul>
            
            <h2 className="text-2xl font-semibold mt-10 mb-4">How It Works</h2>
            <p>
              Cluj Compass aggregates data from multiple sources, including Google Places, Trustpilot, and other review platforms. 
              We combine this information to provide a comprehensive overview of each location, including a composite score 
              that offers a more balanced representation of quality than any single source alone.
            </p>
            
            <h2 className="text-2xl font-semibold mt-10 mb-4">For Business Owners</h2>
            <p>
              Are you a business owner in Cluj-Napoca? We'd love to feature your establishment on Cluj Compass. 
              Contact us to learn more about how we can help increase your visibility to locals and visitors alike.
            </p>
            
            <div className="my-8 p-6 bg-cluj-primary/10 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">Get in Touch</h3>
              <p className="mb-4">
                Have questions, suggestions, or feedback? We'd love to hear from you!
              </p>
              <Link to="/contact">
                <Button>Contact Us</Button>
              </Link>
            </div>
            
            <h2 className="text-2xl font-semibold mt-10 mb-4">Our Team</h2>
            <p>
              Cluj Compass is developed by a team of local tech enthusiasts who are passionate about 
              showcasing the best that Cluj-Napoca has to offer. We combine our expertise in web development, 
              data analysis, and local knowledge to create a platform that serves both residents and visitors.
            </p>
            
            <h2 className="text-2xl font-semibold mt-10 mb-4">Privacy Commitment</h2>
            <p>
              We respect your privacy and are committed to protecting your personal data. 
              To learn more about how we collect, use, and safeguard your information, 
              please read our <Link to="/privacy-policy" className="text-cluj-primary hover:underline">Privacy Policy</Link>.
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default AboutPage;
