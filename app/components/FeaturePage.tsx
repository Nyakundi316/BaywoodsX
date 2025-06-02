'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { FiArrowRight, FiShoppingBag } from 'react-icons/fi';

const featuredItems = [
  {
    id: 1,
    title: "Nike Air Max",
    description: "Signature Nike comfort with classic street appeal.",
    price: 4500,
    category: "Footwear",
    image: "https://i.pinimg.com/736x/03/a4/69/03a469690805a58b99188f17e11aaeef.jpg"
  },
  {
    id: 2,
    title: "Tech Joggers",
    description: "Performance fabric with hidden pockets",
    price: 2000,
    category: "Pants",
    image: "https://i.pinimg.com/736x/29/33/79/293379e0a885d453063e8a1270732b15.jpg"
  },
  {
    id: 3,
    title: "Jorts",
    description: "Utility shorts with multiple pockets",
    price: 2000,
    category: "Pants",
    image: "https://i.pinimg.com/736x/6e/3f/b7/6e3fb7fb750031a2349a0cb205931163.jpg"
  },
  {
    id: 4,
    title: "New Era Cap",
    description: "Classic fitted cap with embroidered team logo",
    price: 1800,
    category: "Caps",
    image: "https://i.pinimg.com/736x/bf/c0/aa/bfc0aadb7607fc31a8b579846fe45d87.jpg"
  },
  {
    id: 5,
    title: "Balenciaga trainners",
    description: "Vintage-inspired sneakers with modern comfort",
    price: 4000,
    category: "Footwear",
    image: "https://i.pinimg.com/736x/e9/38/68/e938689f89e81f715939e65927a37d15.jpg"
  },
  {
    id: 6,
    title: "Nike tns",
    description: "LIght and can be used for running",
    price: 3500,
    category: "Footwear",
    image: "https://i.pinimg.com/736x/c2/1c/a2/c21ca2ea58f72b0ff94fc66fb63bce81.jpg"
  },
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
  const mainFeatured = featuredItems[0];
  const restItems = featuredItems.slice(1);

  return (
    <section className="bg-gray-50 text-black py-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-black to-gray-600">
            Featured Streetwear
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Premium shoes, caps, and pants you can’t miss
          </p>
        </motion.div>

        {/* Main Featured Product */}
        <motion.div
          initial="hidden"
          whileInView="show"
          variants={itemAnimation}
          viewport={{ once: true }}
          className="flex flex-col lg:flex-row items-center gap-10 mb-20"
        >
          <div className="relative w-full lg:w-1/2 h-[500px] rounded-2xl overflow-hidden shadow-xl">
            <Image
              src={mainFeatured.image}
              alt={mainFeatured.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </div>

          <div className="lg:w-1/2 text-center lg:text-left">
            <h2 className="text-3xl font-bold mb-2">{mainFeatured.title}</h2>
            <p className="text-gray-600 mb-4">{mainFeatured.description}</p>
            <p className="text-xl font-semibold mb-6">KES {mainFeatured.price.toLocaleString()}</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-black text-white rounded-full flex items-center gap-2 mx-auto lg:mx-0"
            >
              <FiShoppingBag /> Add to Cart
            </motion.button>
          </div>
        </motion.div>

        {/* Rest of Featured Items */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {restItems.map((item) => (
            <motion.div
              key={item.id}
              variants={itemAnimation}
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              <div className="relative w-full h-80 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <span className="text-sm text-gray-500">{item.category}</span>
                <h3 className="text-xl font-bold mt-1">{item.title}</h3>
                <p className="text-gray-600 mt-2 mb-4">{item.description}</p>
                <div className="flex items-center justify-between">
                  <span className="font-semibold">KES {item.price.toLocaleString()}</span>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    className="p-2 bg-black text-white rounded-full"
                  >
                    <FiShoppingBag />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
