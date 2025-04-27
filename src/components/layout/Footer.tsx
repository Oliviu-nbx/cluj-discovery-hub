
import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-cluj-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center">
              <MapPin className="h-6 w-6 text-cluj-tertiary" />
              <span className="ml-2 text-lg font-semibold">
                Cluj<span className="text-cluj-tertiary">Compass</span>
              </span>
            </Link>
            <p className="mt-4 text-sm text-gray-300">
              Your ultimate guide to discovering the best places in Cluj-Napoca, Romania. Find restaurants, cafes, attractions, and much more.
            </p>
          </div>
          
          {/* Links */}
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="text-sm font-semibold tracking-wider uppercase">Navigation</h3>
              <div className="mt-4 space-y-2">
                <Link to="/" className="block text-sm text-gray-300 hover:text-white">Home</Link>
                <Link to="/categories" className="block text-sm text-gray-300 hover:text-white">Categories</Link>
                <Link to="/about" className="block text-sm text-gray-300 hover:text-white">About</Link>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold tracking-wider uppercase">Legal</h3>
              <div className="mt-4 space-y-2">
                <Link to="/privacy-policy" className="block text-sm text-gray-300 hover:text-white">Privacy Policy</Link>
                <Link to="/terms-of-service" className="block text-sm text-gray-300 hover:text-white">Terms of Service</Link>
                <Link to="/cookie-policy" className="block text-sm text-gray-300 hover:text-white">Cookie Policy</Link>
              </div>
            </div>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider uppercase">Contact Us</h3>
            <p className="mt-4 text-sm text-gray-300">
              Have questions or suggestions? We'd love to hear from you!
            </p>
            <Link to="/contact" className="mt-4 inline-block text-sm text-cluj-tertiary hover:underline">
              Contact Us
            </Link>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-700">
          <p className="text-sm text-gray-300 text-center">
            © {currentYear} Cluj Compass. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
