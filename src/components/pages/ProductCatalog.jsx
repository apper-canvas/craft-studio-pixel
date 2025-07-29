import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import SearchBar from "@/components/molecules/SearchBar";
import CategoryFilter from "@/components/molecules/CategoryFilter";
import ProductGrid from "@/components/organisms/ProductGrid";
import { productService } from "@/services/api/productService";
import { categoryService } from "@/services/api/categoryService";
import ApperIcon from "@/components/ApperIcon";

const ProductCatalog = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Load initial data
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      setError("");
      
      const [productsData, categoriesData] = await Promise.all([
        productService.getAll(),
        categoryService.getAll()
      ]);
      
      setProducts(productsData);
      setCategories(categoriesData);
      setFilteredProducts(productsData);
    } catch (err) {
      setError("Failed to load products. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Filter products based on category and search
  useEffect(() => {
    let filtered = products;

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
      );
    }

    setFilteredProducts(filtered);
  }, [products, selectedCategory, searchQuery]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleRetry = () => {
    loadData();
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 via-secondary-50 to-purple-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl mb-6">
              <span className="bg-gradient-to-r from-primary-600 via-secondary-600 to-purple-600 bg-clip-text text-transparent">
                Custom Products
              </span>
              <br />
              <span className="text-gray-900">Made Perfect</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Transform your ideas into reality with our premium collection of customizable products. 
              From apparel to signage, we make your vision come to life.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <SearchBar
                onSearch={handleSearch}
                placeholder="Search thousands of customizable products..."
              />
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <ApperIcon name="Package" className="w-8 h-8 text-white" />
              </div>
              <div className="font-display font-bold text-2xl text-gray-900">500+</div>
              <div className="text-sm text-gray-600">Products</div>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-secondary-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <ApperIcon name="Palette" className="w-8 h-8 text-white" />
              </div>
              <div className="font-display font-bold text-2xl text-gray-900">∞</div>
              <div className="text-sm text-gray-600">Customizations</div>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <ApperIcon name="Truck" className="w-8 h-8 text-white" />
              </div>
              <div className="font-display font-bold text-2xl text-gray-900">3-5</div>
              <div className="text-sm text-gray-600">Days Shipping</div>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-accent-500 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <ApperIcon name="Award" className="w-8 h-8 text-white" />
              </div>
              <div className="font-display font-bold text-2xl text-gray-900">A+</div>
              <div className="text-sm text-gray-600">Quality</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters */}
            <aside className="lg:w-80 flex-shrink-0">
              <div className="sticky top-24">
                <CategoryFilter
                  categories={categories}
                  selectedCategory={selectedCategory}
                  onCategoryChange={handleCategoryChange}
                />
              </div>
            </aside>

            {/* Products Section */}
            <main className="flex-1 min-w-0">
              {/* Results Header */}
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="font-display font-bold text-2xl text-gray-900">
                    {selectedCategory ? selectedCategory : "All Products"}
                  </h2>
                  <p className="text-gray-600 mt-1">
                    {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""} found
                    {searchQuery && ` for "${searchQuery}"`}
                  </p>
                </div>
                
                {/* Clear Filters */}
                {(selectedCategory || searchQuery) && (
                  <button
                    onClick={() => {
                      setSelectedCategory(null);
                      setSearchQuery("");
                    }}
                    className="flex items-center space-x-2 text-sm text-primary-600 hover:text-primary-700 font-medium"
                  >
                    <ApperIcon name="X" className="w-4 h-4" />
                    <span>Clear Filters</span>
                  </button>
                )}
              </div>

              {/* Product Grid */}
              <ProductGrid
                products={filteredProducts}
                loading={loading}
                error={error}
                onRetry={handleRetry}
              />
            </main>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductCatalog;