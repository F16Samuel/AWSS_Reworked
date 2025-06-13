
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronDown, Recycle } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-gradient-awss shadow-lg sticky top-0 z-50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Branding and Dropdown Trigger on Mobile */}
          <div className="flex items-center space-x-2 md:space-x-4">
            <div
              className="flex items-center space-x-2 cursor-pointer md:cursor-default"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <div className="bg-white p-2 rounded-lg shadow-md">
                <Recycle className="h-8 w-8 text-emerald-600" />
              </div>
              <div className="text-white">
                <div className="font-bold text-xl flex items-center">
                  AWSS
                  <ChevronDown className="ml-1 h-4 w-4 md:hidden" />
                </div>
                <div className="text-xs opacity-90">CLASSIFY YOUR WASTE</div>
              </div>
            </div>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <Link
              to="/"
              className={`text-white font-medium transition-all duration-200 hover:text-emerald-100 ${
                isActive("/") ? "border-b-2 border-white pb-1" : ""
              }`}
            >
              Home
            </Link>
            <Link
              to="/our-model"
              className={`text-white font-medium transition-all duration-200 hover:text-emerald-100 ${
                isActive("/our-model") ? "border-b-2 border-white pb-1" : ""
              }`}
            >
              Our Model
            </Link>
            <Link
              to="/about-us"
              className={`text-white font-medium transition-all duration-200 hover:text-emerald-100 ${
                isActive("/about-us") ? "border-b-2 border-white pb-1" : ""
              }`}
            >
              About Us
            </Link>
          </nav>
          <a href="mailto:project.samarops@gmail.com">
            <Button 
              variant="outline" 
              className="bg-white text-emerald-600 border-white hover:bg-emerald-50 font-medium"
            >
              Get in Touch
            </Button>
          </a>
        </div>
        {/* Mobile Dropdown Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-2 space-y-2 pb-4">
            <Link
              to="/"
              className={`block text-white px-4 py-2 drop-shadow-md hover:bg-emerald-700 rounded ${
                isActive("/") ? "bg-emerald-800" : ""
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/our-model"
              className={`block text-white px-4 py-2 drop-shadow-md hover:bg-emerald-700 rounded ${
                isActive("/our-model") ? "bg-emerald-800" : ""
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Our Model
            </Link>
            <Link
              to="/about-us"
              className={`block text-white px-4 py-2 drop-shadow-md hover:bg-emerald-700 rounded ${
                isActive("/about-us") ? "bg-emerald-800" : ""
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              About Us
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
