import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Button from "@/components/atoms/Button";
import Empty from "@/components/ui/Empty";
import ApperIcon from "@/components/ApperIcon";
import { orderService } from "@/services/api/orderService";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";

const MyOrders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      const ordersData = await orderService.getAll();
      setOrders(ordersData);
    } catch (err) {
      setError("Failed to load orders");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleStartDesigning = () => {
    navigate("/design-studio");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loading message="Loading your orders..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Error message={error} onRetry={loadOrders} />
      </div>
    );
  }

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
              Track your custom design orders, view order history, and manage your creative purchases all in one place.
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
                  Design Tracking
                </h3>
                <p className="text-gray-600">
                  Real-time updates on your custom design orders from approval to delivery.
                </p>
              </div>

              <div className="bg-surface rounded-2xl p-8 shadow-card text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <ApperIcon name="History" className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-display font-bold text-xl text-gray-900 mb-3">
                  Design History
                </h3>
                <p className="text-gray-600">
                  View all your previous designs, reorder favorites, and download files.
                </p>
              </div>

              <div className="bg-surface rounded-2xl p-8 shadow-card text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <ApperIcon name="Edit" className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-display font-bold text-xl text-gray-900 mb-3">
                  Design Revisions
                </h3>
                <p className="text-gray-600">
                  Request modifications to your designs before final production.
                </p>
              </div>
            </div>

            {/* Orders List or Empty State */}
            {orders.length === 0 ? (
              <Empty
                title="No design orders yet"
                message="Start creating amazing custom designs! Use our Design Studio to create your first design and place an order to see it tracked here."
                actionText="Start Designing"
                onAction={handleStartDesigning}
                icon="Palette"
              />
            ) : (
              <div className="space-y-6">
                {orders.map((order) => (
                  <div key={order.Id} className="bg-surface rounded-2xl p-6 shadow-card border border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-display font-semibold text-lg text-gray-900">
                          Order #{order.Id}
                        </h3>
                        <p className="text-gray-600">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                          order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          order.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                          order.status === 'completed' ? 'bg-green-100 text-green-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                        <p className="text-lg font-semibold text-gray-900 mt-1">
                          ${order.price}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-600">{order.productType}</p>
                        <p className="text-sm text-gray-500">Quantity: {order.quantity}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                        <Button variant="ghost" size="sm" icon="Download">
                          Download
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
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
              Ready to Create Something New?
            </h2>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
              <Button
                variant="primary"
                size="lg"
                icon="Palette"
                className="flex-1"
                onClick={handleStartDesigning}
              >
                Design Studio
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                icon="History"
                className="flex-1"
                onClick={loadOrders}
              >
                Refresh Orders
              </Button>
            </div>
            
            <p className="text-gray-600 mt-6">
              Need help with your designs? Contact our support team for assistance with orders and customizations.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default MyOrders;