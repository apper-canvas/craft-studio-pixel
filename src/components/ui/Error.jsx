import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const Error = ({ message = "Something went wrong", onRetry, className }) => {
  return (
    <div className={cn("text-center py-12 px-4 animate-fade-in", className)}>
      <div className="max-w-md mx-auto">
        {/* Error Icon */}
        <div className="w-16 h-16 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center mx-auto mb-4">
          <ApperIcon 
            name="AlertCircle" 
            className="w-8 h-8 text-red-600" 
          />
        </div>
        
        {/* Error Title */}
        <h3 className="text-xl font-display font-semibold text-gray-900 mb-2">
          Oops! Something went wrong
        </h3>
        
        {/* Error Message */}
        <p className="text-gray-600 mb-6">
          {message}
        </p>
        
        {/* Retry Button */}
        {onRetry && (
          <button
            onClick={onRetry}
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-medium rounded-lg hover:from-primary-600 hover:to-secondary-600 transition-all duration-200 transform hover:scale-105 shadow-button hover:shadow-button-hover"
          >
            <ApperIcon name="RotateCcw" className="w-4 h-4 mr-2" />
            Try Again
          </button>
        )}
        
        {/* Alternative Actions */}
        <div className="mt-6 text-sm text-gray-500">
          <p>If the problem persists, please contact our support team.</p>
        </div>
      </div>
    </div>
  );
};

export default Error;