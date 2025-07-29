import { forwardRef } from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const Button = forwardRef(({ 
  className, 
  variant = "primary", 
  size = "md", 
  children, 
  icon,
  iconPosition = "left",
  loading = false,
  disabled = false,
  ...props 
}, ref) => {
  const variants = {
    primary: "bg-gradient-to-r from-primary-500 to-secondary-500 text-white hover:from-primary-600 hover:to-secondary-600 shadow-button hover:shadow-button-hover",
    secondary: "border-2 border-primary-300 text-primary-600 hover:bg-primary-50 hover:border-primary-400",
    accent: "bg-gradient-to-r from-accent-500 to-red-500 text-white hover:from-accent-600 hover:to-red-600 shadow-button hover:shadow-button-hover",
    ghost: "text-gray-600 hover:text-primary-600 hover:bg-primary-50",
    outline: "border border-gray-300 text-gray-700 hover:border-primary-400 hover:text-primary-600 bg-white hover:bg-primary-50"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm font-medium",
    md: "px-4 py-2 text-sm font-medium",
    lg: "px-6 py-3 text-base font-semibold",
    xl: "px-8 py-4 text-lg font-semibold"
  };

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-lg transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2",
        variants[variant],
        sizes[size],
        className
      )}
      ref={ref}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <div className="animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent mr-2" />
      )}
      
      {icon && iconPosition === "left" && !loading && (
        <ApperIcon name={icon} className="w-4 h-4 mr-2" />
      )}
      
      {children}
      
      {icon && iconPosition === "right" && !loading && (
        <ApperIcon name={icon} className="w-4 h-4 ml-2" />
      )}
    </button>
  );
});

Button.displayName = "Button";

export default Button;