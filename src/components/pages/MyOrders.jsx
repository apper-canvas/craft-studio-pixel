import { motion } from "framer-motion";
import Button from "@/components/atoms/Button";
import Empty from "@/components/ui/Empty";
import ApperIcon from "@/components/ApperIcon";

const MyOrders = () => {
  const handleBrowseProducts = () => {
    // This will be handled by the Empty component's onAction
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-gradient-to-br from-primary-50 via-secondary-50 to-purple-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            {/* Icon */}
            <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <ApperIcon name="ShoppingBag" className="w-10 h-10 text-white" />
            </div>
            
            {/* Title */}
            <h1 className="font-display font-bold text-4xl md:text-5xl text-gray-900 mb-4">
              <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                My Orders
              </span>
            </h1>
            
            {/* Description */}
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Track your orders, view order history, and manage your custom product purchases all in one place.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Orders Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Order Management Features Preview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <div className="bg-surface rounded-2xl p-8 shadow-card text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <ApperIcon name="Package" className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-display font-bold text-xl text-gray-900 mb-3">
                  Order Tracking
                </h3>
                <p className="text-gray-600">
                  Real-time updates on your order status from design approval to doorstep delivery.
                </p>
              </div>

              <div className="bg-surface rounded-2xl p-8 shadow-card text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <ApperIcon name="History" className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-display font-bold text-xl text-gray-900 mb-3">
                  Order History
                </h3>
                <p className="text-gray-600">
                  View all your previous orders, reorder favorites, and download invoices.
                </p>
              </div>

              <div className="bg-surface rounded-2xl p-8 shadow-card text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <ApperIcon name="RotateCcw" className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-display font-bold text-xl text-gray-900 mb-3">
                  Easy Returns
                </h3>
                <p className="text-gray-600">
                  Simple return process with prepaid labels and full refund guarantee.
                </p>
              </div>
            </div>

            {/* Empty State */}
            <Empty
              title="No orders yet"
              message="Start creating amazing custom products! Browse our catalog and place your first order to see it tracked here."
              actionText="Browse Products"
              onAction={handleBrowseProducts}
              icon="ShoppingBag"
            />
          </motion.div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-16 bg-gradient-to-r from-gray-50 to-primary-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center"
          >
            <h2 className="font-display font-bold text-3xl text-gray-900 mb-8">
              Ready to Get Started?
            </h2>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
              <Button
                variant="primary"
                size="lg"
                icon="Package"
                className="flex-1"
              >
                Browse Products
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                icon="Palette"
                className="flex-1"
              >
                Design Studio
              </Button>
            </div>
            
            <p className="text-gray-600 mt-6">
              Need help? Contact our support team for assistance with orders and customizations.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default MyOrders;