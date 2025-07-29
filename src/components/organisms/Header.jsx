import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/ApperIcon";
import ShoppingCart from "@/components/organisms/ShoppingCart";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const navigationItems = [
    { path: "/products", label: "Products", icon: "Package" },
    { path: "/design-studio", label: "Design Studio", icon: "Palette" },
    { path: "/my-orders", label: "My Orders", icon: "ShoppingBag" }
  ];

  const isActivePath = (path) => {
    if (path === "/products") {
      return location.pathname === "/" || location.pathname === "/products";
    }
    return location.pathname === path;
  };

  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <>
      <header className="sticky top-0 z-40 bg-surface/95 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link 
              to="/" 
              className="flex items-center space-x-3 group"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform">
                <ApperIcon name="Palette" className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="font-display font-bold text-xl bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                  Craft Studio
                </h1>
                <p className="text-xs text-gray-500 -mt-1">Custom Design</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navigationItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg font-medium transition-all duration-200 ${
                    isActivePath(item.path)
                      ? "bg-gradient-to-r from-primary-50 to-secondary-50 text-primary-600"
                      : "text-gray-600 hover:text-primary-600 hover:bg-primary-50"
                  }`}
                >
                  <ApperIcon name={item.icon} className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>

            {/* Header Actions */}
            <div className="flex items-center space-x-4">
              {/* Search */}
              <Button
                variant="ghost"
                size="sm"
                icon="Search"
                className="hidden sm:flex"
              />
              
              {/* Cart */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
              >
                <ApperIcon name="ShoppingCart" className="w-6 h-6" />
                {cartItemCount > 0 && (
                  <Badge 
                    variant="accent" 
                    size="sm"
                    className="absolute -top-1 -right-1 min-w-[20px] h-5 flex items-center justify-center text-xs animate-bounce-light"
                  >
                    {cartItemCount}
                  </Badge>
                )}
              </button>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
              >
                <ApperIcon 
                  name={isMenuOpen ? "X" : "Menu"} 
                  className="w-6 h-6" 
                />
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200 animate-fade-in">
              <nav className="space-y-2">
                {navigationItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                      isActivePath(item.path)
                        ? "bg-gradient-to-r from-primary-50 to-secondary-50 text-primary-600"
                        : "text-gray-600 hover:text-primary-600 hover:bg-primary-50"
                    }`}
                  >
                    <ApperIcon name={item.icon} className="w-5 h-5" />
                    <span>{item.label}</span>
                  </Link>
                ))}
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Shopping Cart Sidebar */}
      <ShoppingCart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={(id, quantity) => {
          setCartItems(items => 
            items.map(item => 
              item.Id === id ? { ...item, quantity } : item
            )
          );
        }}
        onRemoveItem={(id) => {
          setCartItems(items => items.filter(item => item.Id !== id));
        }}
      />
    </>
  );
};

export default Header;