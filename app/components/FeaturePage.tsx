'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { FiArrowRight, FiShoppingBag } from 'react-icons/fi';

const featuredItems = [
  {
    id: 1,
    title: "Urban Edge Jacket",
    description: "Premium waterproof jacket with streetwear aesthetic",
    price: 12500,
    category: "Outerwear",
    image: "https://images.pexels.com/photos/1765008/pexels-photo-1765008.jpeg"
  },
  {
    id: 2,
    title: "Neon Nights Hoodie",
    description: "Reflective pullover for night visibility",
    price: 8500,
    category: "Hoodies",
    image: "https://images.pexels.com/photos/7679725/pexels-photo-7679725.jpeg"
  },
  {
    id: 3,
    title: "Tech Joggers",
    description: "Performance fabric with hidden pockets",
    price: 7500,
    category: "Pants",
    image: "https://images.pexels.com/photos/1078974/pexels-photo-1078974.jpeg"
  },
  {
    id: 4,
    title: "Retro Runners",
    description: "Vintage-inspired sneakers with modern comfort",
    price: 11000,
    category: "Footwear",
    image: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg"
  },
  {
    id: 5,
    title: "Cargo Shorts",
    description: "Utility shorts with multiple pockets",
    price: 6500,
    category: "Shorts",
    image: "https://images.pexels.com/photos/1488467/pexels-photo-1488467.jpeg"
  },
  {
    id: 6,
    title: "Graphic Tee Bundle",
    description: "Set of 3 limited edition artist collabs",
    price: 9000,
    category: "T-Shirts",
    image: "https://images.pexels.com/photos/428338/pexels-photo-428338.jpeg"
  }
];

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemAnimation = {
  hidden: { y: 20, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

export default function FeaturePage() {
  return (
    <section className="bg-gray-50 text-black py-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Animated Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-black to-gray-600">
            Featured Drops
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Curated selection of our most exclusive streetwear pieces
          </p>
          
          <div className="mt-8 flex justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-black text-white rounded-full flex items-center gap-2"
            >
              View All Collections <FiArrowRight />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 border border-black rounded-full flex items-center gap-2"
            >
              New Arrivals
            </motion.button>
          </div>
        </motion.div>

        {/* Featured Items Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {featuredItems.map((item) => (
            <motion.div
              key={item.id}
              variants={itemAnimation}
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              <div className="relative w-full h-96 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority={item.id <= 3}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                <div className="absolute top-4 right-4">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-3 bg-white rounded-full shadow-md"
                  >
                    <FiShoppingBag className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-sm text-gray-500">{item.category}</span>
                    <h3 className="text-xl font-bold mt-1">{item.title}</h3>
                  </div>
                  <span className="font-bold text-lg">KES {item.price.toLocaleString()}</span>
                </div>
                
                <p className="text-gray-600 mt-2 mb-4">{item.description}</p>
                
                <motion.button
                  whileHover={{ backgroundColor: "#000000" }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full py-3 bg-gray-900 text-white rounded-lg flex items-center justify-center gap-2"
                >
                  Add to Cart
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View More Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-4 border-2 border-black rounded-full font-medium flex items-center gap-2 mx-auto"
          >
            Load More <FiArrowRight />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}