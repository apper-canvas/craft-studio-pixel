import { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Badge = forwardRef(({ 
  className, 
  variant = "default", 
  size = "md",
  children, 
  ...props 
}, ref) => {
  const variants = {
    default: "bg-gray-100 text-gray-800",
    primary: "bg-gradient-to-r from-primary-100 to-secondary-100 text-primary-800",
    accent: "bg-gradient-to-r from-accent-100 to-red-100 text-accent-800",
    success: "bg-green-100 text-green-800",
    warning: "bg-yellow-100 text-yellow-800",
    category: "bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-sm"
  };

  const sizes = {
    sm: "px-2 py-1 text-xs font-medium",
    md: "px-3 py-1 text-sm font-medium",
    lg: "px-4 py-2 text-sm font-semibold"
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full transition-colors",
        variants[variant],
        sizes[size],
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </span>
  );
});

Badge.displayName = "Badge";

export default Badge;