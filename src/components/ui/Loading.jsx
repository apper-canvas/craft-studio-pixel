import { cn } from "@/utils/cn";

const Loading = ({ className, message = "Loading design elements..." }) => {
  return (
    <div className={cn("animate-fade-in", className)}>
      {/* Design Elements Grid Skeleton */}
      <div className="space-y-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="bg-surface rounded-lg p-3 border border-gray-200 animate-pulse"
          >
            <div className="flex items-center gap-3">
              {/* Element Icon Skeleton */}
              <div className="w-10 h-10 bg-gray-200 rounded-lg shimmer"></div>
              
              <div className="flex-1">
                {/* Element Name Skeleton */}
                <div className="h-4 bg-gray-200 rounded mb-2 shimmer"></div>
                
                {/* Element Description Skeleton */}
                <div className="h-3 bg-gray-200 rounded w-3/4 shimmer"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Loading Text */}
      <div className="text-center mt-6">
        <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-lg">
          <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
          <span className="font-medium">{message}</span>
        </div>
      </div>
    </div>
  );
};

export default Loading;