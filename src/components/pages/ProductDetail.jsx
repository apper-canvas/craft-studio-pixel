import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import { productService } from "@/services/api/productService";
import ApperIcon from "@/components/ApperIcon";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadProduct();
  }, [id]);

  const loadProduct = async () => {
    try {
      setLoading(true);
      setError("");
      
      const productData = await productService.getById(parseInt(id));
      setProduct(productData);
      
      // Set default selections
      if (productData.specifications.sizes?.length > 0) {
        setSelectedSize(productData.specifications.sizes[0]);
      }
      if (productData.specifications.colors?.length > 0) {
        setSelectedColor(productData.specifications.colors[0]);
      }
    } catch (err) {
      setError("Product not found. Please check the URL and try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    // Simulate adding to cart
    toast.success(`Added ${product.name} to cart!`);
  };

  const handleStartDesigning = () => {
    navigate("/design-studio", { state: { productId: product.Id } });
  };

  const calculatePrice = () => {
    let price = product.basePrice;
    
    // Add size premium
    if (selectedSize === "Large" || selectedSize === "XL") {
      price += 5;
    } else if (selectedSize === "XXL") {
      price += 10;
    }
    
    return price * quantity;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Loading />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Error 
            message={error}
            onRetry={loadProduct}
          />
        </div>
      </div>
    );
  }

  if (!product) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center space-x-2 text-sm">
            <button
              onClick={() => navigate("/")}
              className="text-primary-600 hover:text-primary-700 font-medium"
            >
              Products
            </button>
            <ApperIcon name="ChevronRight" className="w-4 h-4 text-gray-400" />
            <span className="text-gray-600">{product.category}</span>
            <ApperIcon name="ChevronRight" className="w-4 h-4 text-gray-400" />
            <span className="text-gray-900 font-medium">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Product Details */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Images */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Main Image */}
              <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl overflow-hidden mb-6">
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Image Thumbnails */}
              {product.images.length > 1 && (
                <div className="flex space-x-4">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 ${
                        selectedImage === index
                          ? "ring-2 ring-primary-500"
                          : "ring-1 ring-gray-300"
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${product.name} view ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              {/* Category Badge */}
              <Badge variant="category" size="md">
                {product.category}
              </Badge>

              {/* Product Title */}
              <div>
                <h1 className="font-display font-bold text-3xl lg:text-4xl text-gray-900 mb-2">
                  {product.name}
                </h1>
                <p className="text-gray-600 text-lg">
                  {product.description}
                </p>
              </div>

              {/* Price */}
              <div className="flex items-baseline space-x-2">
                <span className="font-display font-bold text-4xl bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                  ${calculatePrice().toFixed(2)}
                </span>
                {quantity > 1 && (
                  <span className="text-gray-500">
                    (${product.basePrice} each)
                  </span>
                )}
              </div>

              {/* Size Selection */}
              {product.specifications.sizes && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Size
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.specifications.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-4 py-2 rounded-lg border-2 font-medium transition-all ${
                          selectedSize === size
                            ? "border-primary-500 bg-primary-50 text-primary-700"
                            : "border-gray-300 hover:border-primary-300 text-gray-700"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Color Selection */}
              {product.specifications.colors && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Color
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.specifications.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-4 py-2 rounded-lg border-2 font-medium transition-all ${
                          selectedColor === color
                            ? "border-primary-500 bg-primary-50 text-primary-700"
                            : "border-gray-300 hover:border-primary-300 text-gray-700"
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Quantity
                </label>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:border-primary-400 transition-colors"
                  >
                    <ApperIcon name="Minus" className="w-4 h-4" />
                  </button>
                  
                  <span className="w-12 text-center font-semibold text-lg">
                    {quantity}
                  </span>
                  
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:border-primary-400 transition-colors"
                  >
                    <ApperIcon name="Plus" className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={handleStartDesigning}
                  variant="primary"
                  size="lg"
                  icon="Palette"
                  className="flex-1"
                >
                  Start Designing
                </Button>
                
                <Button
                  onClick={handleAddToCart}
                  variant="outline"
                  size="lg"
                  icon="ShoppingCart"
                  className="flex-1"
                >
                  Add to Cart
                </Button>
              </div>

              {/* Features */}
              <div className="bg-gradient-to-r from-gray-50 to-primary-50 rounded-xl p-6">
                <h3 className="font-display font-semibold text-lg text-gray-900 mb-4">
                  Product Features
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <ApperIcon name="Sparkles" className="w-5 h-5 text-primary-500" />
                    <span className="text-gray-700">Fully customizable design</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <ApperIcon name="Award" className="w-5 h-5 text-primary-500" />
                    <span className="text-gray-700">Premium quality materials</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <ApperIcon name="Truck" className="w-5 h-5 text-primary-500" />
                    <span className="text-gray-700">Fast 3-5 day shipping</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <ApperIcon name="RotateCcw" className="w-5 h-5 text-primary-500" />
                    <span className="text-gray-700">30-day return guarantee</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetail;