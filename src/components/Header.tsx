
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Recycle } from "lucide-react";

const Header = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-gradient-awss shadow-lg sticky top-0 z-50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2 hover:scale-105 transition-transform">
            <div className="bg-white p-2 rounded-lg shadow-md">
              <Recycle className="h-8 w-8 text-emerald-600" />
            </div>
            <div className="text-white">
              <div className="font-bold text-xl">AWSS</div>
              <div className="text-xs opacity-90">CLASSIFY YOUR WASTE</div>
            </div>
          </Link>
          
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

          <Button 
            variant="outline" 
            className="bg-white text-emerald-600 border-white hover:bg-emerald-50 font-medium"
          >
            Get in Touch
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
