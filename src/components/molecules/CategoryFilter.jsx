import { useState } from "react";
import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/ApperIcon";

const CategoryFilter = ({ categories, selectedCategory, onCategoryChange }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="bg-surface rounded-xl p-6 shadow-card">
      {/* Filter Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display font-semibold text-gray-900 text-lg">
          Categories
        </h3>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-1 hover:bg-gray-100 rounded-lg transition-colors lg:hidden"
        >
          <ApperIcon 
            name={isExpanded ? "ChevronUp" : "ChevronDown"} 
            className="w-5 h-5 text-gray-500" 
          />
        </button>
      </div>
      
      {/* Category List */}
      <div className={`space-y-2 ${!isExpanded ? "hidden lg:block" : ""}`}>
        {/* All Products Option */}
        <button
          onClick={() => onCategoryChange(null)}
          className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-all duration-200 ${
            selectedCategory === null
              ? "bg-gradient-to-r from-primary-50 to-secondary-50 border-2 border-primary-200"
              : "hover:bg-gray-50 border-2 border-transparent"
          }`}
        >
          <div className="flex items-center">
            <ApperIcon name="Grid3X3" className="w-5 h-5 mr-3 text-primary-500" />
            <span className="font-medium text-gray-900">All Products</span>
          </div>
          <Badge variant="default" size="sm">
            {categories.reduce((total, cat) => total + cat.productCount, 0)}
          </Badge>
        </button>
        
        {/* Category Options */}
        {categories.map((category) => (
          <button
            key={category.Id}
            onClick={() => onCategoryChange(category.name)}
            className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-all duration-200 ${
              selectedCategory === category.name
                ? "bg-gradient-to-r from-primary-50 to-secondary-50 border-2 border-primary-200"
                : "hover:bg-gray-50 border-2 border-transparent"
            }`}
          >
            <div className="flex items-center">
              <ApperIcon 
                name={category.icon} 
                className="w-5 h-5 mr-3 text-primary-500" 
              />
              <span className="font-medium text-gray-900">{category.name}</span>
            </div>
            <Badge variant="default" size="sm">
              {category.productCount}
            </Badge>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;