import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  return (
    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
      {/* Product Image */}
      <div className="w-16 h-16 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg overflow-hidden flex-shrink-0">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Product Details */}
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-gray-900 truncate">{item.name}</h4>
        <p className="text-sm text-gray-600">{item.category}</p>
        <p className="text-lg font-bold text-primary-600">${item.price}</p>
      </div>
      
      {/* Quantity Controls */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => onUpdateQuantity(item.Id, Math.max(1, item.quantity - 1))}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-white border border-gray-300 hover:border-primary-400 transition-colors"
        >
          <ApperIcon name="Minus" className="w-4 h-4" />
        </button>
        
        <span className="w-8 text-center font-medium">{item.quantity}</span>
        
        <button
          onClick={() => onUpdateQuantity(item.Id, item.quantity + 1)}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-white border border-gray-300 hover:border-primary-400 transition-colors"
        >
          <ApperIcon name="Plus" className="w-4 h-4" />
        </button>
      </div>
      
      {/* Remove Button */}
      <button
        onClick={() => onRemove(item.Id)}
        className="p-2 text-gray-400 hover:text-red-500 transition-colors"
      >
        <ApperIcon name="Trash2" className="w-4 h-4" />
      </button>
    </div>
  );
};

export default CartItem;