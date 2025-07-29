import { useNavigate } from "react-router-dom";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/ApperIcon";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const handleCustomize = () => {
    navigate(`/product/${product.Id}`);
  };

  return (
    <div className="bg-surface rounded-xl p-4 shadow-card hover:shadow-card-hover transition-all duration-200 transform hover:scale-[1.02] group animate-fade-in">
      {/* Product Image */}
      <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg mb-4 overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      
      {/* Product Category Badge */}
      <div className="mb-2">
        <Badge variant="category" size="sm">
          {product.category}
        </Badge>
      </div>
      
      {/* Product Name */}
      <h3 className="font-display font-semibold text-gray-900 text-lg mb-2 line-clamp-2">
        {product.name}
      </h3>
      
      {/* Product Description */}
      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
        {product.description}
      </p>
      
      {/* Price and Action Row */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-sm text-gray-500">Starting at</span>
          <span className="font-display font-bold text-xl bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
            ${product.basePrice}
          </span>
        </div>
        
        <Button
          onClick={handleCustomize}
          variant="primary"
          size="sm"
          icon="Palette"
        >
          Customize
        </Button>
      </div>
      
      {/* Customizable Indicator */}
      {product.customizable && (
        <div className="mt-3 flex items-center text-primary-600 text-xs font-medium">
          <ApperIcon name="Sparkles" className="w-3 h-3 mr-1" />
          Fully Customizable
        </div>
      )}
    </div>
  );
};

export default ProductCard;