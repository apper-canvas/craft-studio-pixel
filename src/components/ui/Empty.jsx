import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const Empty = ({ 
  title = "No items found", 
  message = "Try adjusting your search or browse our featured products.", 
  actionText = "Browse All Products",
  onAction,
  icon = "Package",
  className 
}) => {
  return (
    <div className={cn("text-center py-16 px-4 animate-fade-in", className)}>
      <div className="max-w-md mx-auto">
        {/* Empty State Icon */}
        <div className="w-20 h-20 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <ApperIcon 
            name={icon} 
            className="w-10 h-10 text-primary-500" 
          />
        </div>
        
        {/* Empty State Title */}
        <h3 className="text-2xl font-display font-bold text-gray-900 mb-3">
          {title}
        </h3>
        
        {/* Empty State Message */}
        <p className="text-gray-600 mb-8 leading-relaxed">
          {message}
        </p>
        
        {/* Call to Action */}
        {onAction && (
          <button
            onClick={onAction}
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-semibold rounded-xl hover:from-primary-600 hover:to-secondary-600 transition-all duration-200 transform hover:scale-105 shadow-button hover:shadow-button-hover"
          >
            <ApperIcon name="Sparkles" className="w-5 h-5 mr-2" />
            {actionText}
          </button>
        )}
        
        {/* Additional Suggestions */}
        <div className="mt-8 p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl">
          <p className="text-sm text-gray-600 mb-3 font-medium">
            Popular Categories:
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {["T-Shirts", "Mugs", "Stickers", "Business Cards"].map((category) => (
              <span
                key={category}
                className="px-3 py-1 bg-white text-gray-700 rounded-full text-sm font-medium shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              >
                {category}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Empty;