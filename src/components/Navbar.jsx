import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { cart = [] } = useCart();
  const totalQuantity = cart.reduce((sum, item) => sum + (item.quantity || 0), 0);

  return (
    <nav className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo Only (No Text) */}
        <Link to="/">
          <img 
            src="/logo.png" // Update this path to your logo
            alt="Home"
            className="h-8 w-auto" // Adjust height as needed
          />
        </Link>

        {/* Navigation Right Section */}
        <div className="flex items-center gap-6">
          {/* Auth Buttons */}
          <div className="hidden sm:flex items-center gap-4">
            <Link to="/login" className="text-gray-700 hover:text-black font-medium">
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
            >
              Sign Up
            </Link>
          </div>

          {/* Cart Icon */}
          <Link to="/cart" className="relative text-gray-800 hover:text-black">
            <ShoppingCart className="w-6 h-6" />
            {totalQuantity > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-1.5 rounded-full">
                {totalQuantity}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;