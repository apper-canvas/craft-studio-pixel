import { motion } from "framer-motion";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const DesignStudio = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 via-secondary-50 to-purple-50 py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Icon */}
            <div className="w-24 h-24 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-3xl flex items-center justify-center mx-auto mb-8">
              <ApperIcon name="Palette" className="w-12 h-12 text-white" />
            </div>
            
            {/* Title */}
            <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl mb-6">
              <span className="bg-gradient-to-r from-primary-600 via-secondary-600 to-purple-600 bg-clip-text text-transparent">
                Design Studio
              </span>
              <br />
              <span className="text-gray-900">Coming Soon</span>
            </h1>
            
            {/* Description */}
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Our powerful design editor is currently in development. Soon you'll be able to create 
              stunning custom designs with drag-and-drop simplicity, professional templates, and 
              unlimited creative possibilities.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features Preview */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mb-16"
          >
            <h2 className="font-display font-bold text-3xl md:text-4xl text-gray-900 mb-4">
              What's Coming
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Get excited for these amazing features that will transform how you create custom products.
            </p>
          </motion.div>

          {/* Feature Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-surface rounded-2xl p-8 shadow-card hover:shadow-card-hover transition-shadow"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-6">
                <ApperIcon name="MousePointer" className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-display font-bold text-xl text-gray-900 mb-3">
                Drag & Drop Editor
              </h3>
              <p className="text-gray-600">
                Intuitive drag-and-drop interface makes designing effortless. Move, resize, and style elements with ease.
              </p>
            </motion.div>

            {/* Feature 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-surface rounded-2xl p-8 shadow-card hover:shadow-card-hover transition-shadow"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6">
                <ApperIcon name="Layout" className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-display font-bold text-xl text-gray-900 mb-3">
                Professional Templates
              </h3>
              <p className="text-gray-600">
                Start with beautiful, professionally designed templates or create your masterpiece from scratch.
              </p>
            </motion.div>

            {/* Feature 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-surface rounded-2xl p-8 shadow-card hover:shadow-card-hover transition-shadow"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mb-6">
                <ApperIcon name="Type" className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-display font-bold text-xl text-gray-900 mb-3">
                Advanced Typography
              </h3>
              <p className="text-gray-600">
                Access hundreds of fonts, text effects, and typography tools to make your text stand out.
              </p>
            </motion.div>

            {/* Feature 4 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-surface rounded-2xl p-8 shadow-card hover:shadow-card-hover transition-shadow"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mb-6">
                <ApperIcon name="Image" className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-display font-bold text-xl text-gray-900 mb-3">
                Image Library
              </h3>
              <p className="text-gray-600">
                Upload your own images or choose from our extensive library of high-quality stock photos and graphics.
              </p>
            </motion.div>

            {/* Feature 5 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="bg-surface rounded-2xl p-8 shadow-card hover:shadow-card-hover transition-shadow"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center mb-6">
                <ApperIcon name="Eye" className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-display font-bold text-xl text-gray-900 mb-3">
                Real-time Preview
              </h3>
              <p className="text-gray-600">
                See exactly how your design will look on the actual product with our realistic 3D preview system.
              </p>
            </motion.div>

            {/* Feature 6 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="bg-surface rounded-2xl p-8 shadow-card hover:shadow-card-hover transition-shadow"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-blue-500 rounded-2xl flex items-center justify-center mb-6">
                <ApperIcon name="Save" className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-display font-bold text-xl text-gray-900 mb-3">
                Cloud Sync
              </h3>
              <p className="text-gray-600">
                Your designs are automatically saved to the cloud. Access them from any device, anytime.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Notification Signup */}
      <section className="py-16 bg-gradient-to-r from-primary-50 to-secondary-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            <h2 className="font-display font-bold text-3xl text-gray-900 mb-4">
              Be the First to Know
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Get notified when our Design Studio launches and receive exclusive early access.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
              <Button
                variant="primary"
                size="lg"
                icon="Bell"
              >
                Notify Me
              </Button>
            </div>
            
            <p className="text-sm text-gray-500 mt-4">
              No spam, just important updates about our Design Studio launch.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default DesignStudio;