import { forwardRef } from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const Input = forwardRef(({ 
  className, 
  type = "text", 
  label,
  error,
  icon,
  iconPosition = "left",
  ...props 
}, ref) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      
      <div className="relative">
        {icon && iconPosition === "left" && (
          <ApperIcon 
            name={icon} 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" 
          />
        )}
        
        <input
          type={type}
          className={cn(
            "w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200",
            icon && iconPosition === "left" && "pl-12",
            icon && iconPosition === "right" && "pr-12",
            error && "border-red-500 focus:ring-red-500 focus:border-red-500",
            className
          )}
          ref={ref}
          {...props}
        />
        
        {icon && iconPosition === "right" && (
          <ApperIcon 
            name={icon} 
            className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" 
          />
        )}
      </div>
      
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
});

Input.displayName = "Input";

export default Input;