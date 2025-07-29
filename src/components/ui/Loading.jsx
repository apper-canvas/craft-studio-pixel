import { cn } from "@/utils/cn";

const Loading = ({ className }) => {
  return (
    <div className={cn("animate-fade-in", className)}>
      {/* Product Grid Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="bg-surface rounded-xl p-4 shadow-card animate-pulse"
          >
            {/* Product Image Skeleton */}
            <div className="aspect-square bg-gray-200 rounded-lg mb-4 shimmer"></div>
            
            {/* Product Title Skeleton */}
            <div className="h-5 bg-gray-200 rounded mb-2 shimmer"></div>
            
            {/* Product Category Skeleton */}
            <div className="h-4 bg-gray-200 rounded w-2/3 mb-3 shimmer"></div>
            
            {/* Price and Button Row Skeleton */}
            <div className="flex items-center justify-between">
              <div className="h-6 bg-gray-200 rounded w-16 shimmer"></div>
              <div className="h-9 bg-gray-200 rounded w-20 shimmer"></div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Loading Text */}
      <div className="text-center mt-8">
        <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-lg">
          <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
          <span className="font-medium">Loading amazing products...</span>
        </div>
      </div>
    </div>
  );
};

export default Loading;