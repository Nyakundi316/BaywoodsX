'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const ShoeCollectionPage = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  // Fixed color options to prevent hydration mismatch
  const colorOptions = [
    'hsl(213, 70%, 60%)',
    'hsl(201, 70%, 60%)',
    'hsl(5, 70%, 60%)',
    'hsl(56, 70%, 60%)',
    'hsl(315, 70%, 60%)',
    'hsl(121, 70%, 60%)'
  ];

  const categories = [
    { id: 'all', name: 'All Collections' },
    { id: 'running', name: 'Running' },
    { id: 'lifestyle', name: 'Lifestyle' },
    { id: 'basketball', name: 'Basketball' },
    { id: 'limited', name: 'Limited Edition' }
  ];

  const shoes = [
    { 
      id: '2529147', 
      name: 'Vans', 
      category: 'skets',
      price: 129.99,
      colors: 4,
      image: 'https://i.pinimg.com/736x/d1/30/59/d130596f5b9002b6f455f475971c7978.jpg'
    },
    { 
      id: '1598505', 
      name: 'Nike A1', 
      category: 'lifestyle',
      price: 3000,
      colors: 3,
      image: 'https://i.pinimg.com/736x/32/ad/d0/32add06d05698c44a19f416ff3e1f116.jpg'
    },
    { 
      id: '2673016', 
      name: 'Jordans 1', 
      category: 'cactus jack',
      price: 4500,
      colors: 2,
      image: 'https://i.pinimg.com/736x/47/bb/7f/47bb7fda17165708bb0a0a73c781ba5f.jpg'
    },
    { 
      id: '1464625', 
      name: 'Jordans 3', 
      category: 'lifestyle',
      price: 109.99,
      colors: 5,
      image: 'https://i.pinimg.com/736x/f6/f3/92/f6f3926a8947faafe82cdc937b0f89ad.jpg'
    },
    { 
      id: '1032110', 
      name: 'Nike low dunks', 
      category: 'Dunks',
      price: 199.99,
      colors: 1,
      image: 'https://i.pinimg.com/736x/de/3e/19/de3e194451523efed27314f09d38b825.jpg'
    },
    { 
      id: '2385477', 
      name: 'Amiri', 
      category: 'Large',
      price: 139.99,
      colors: 3,
      image: 'https://i.pinimg.com/736x/e0/dc/a4/e0dca4e734cca1b7496a547a830b1b26.jpg'
    }
  ];

  const filteredShoes = activeCategory === 'all' 
    ? shoes 
    : shoes.filter(shoe => shoe.category === activeCategory);

  return (
    <div className="bg-white text-black">
      {/* Featured Product Section - Split Layout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          {/* Description on the left */}
          <div className="lg:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Premium Footwear Collection</h2>
            <p className="text-gray-600 text-lg mb-8">
              Discover our latest lineup of high-performance shoes designed for comfort, style, and durability. 
              Each pair is crafted with premium materials and innovative technology.
            </p>
            <div className="flex flex-wrap gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-all"
              >
                Shop Collection
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-black px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-all"
              >
                View All Styles
              </motion.button>
            </div>
          </div>
          
          {/* Image on the right */}
          <div className="lg:w-1/2">
            <div className="relative aspect-square rounded-xl overflow-hidden shadow-lg">
              <Image
                src="https://i.pinimg.com/736x/f4/55/26/f45526e671bf68b2a7da0f3f5f462f44.jpg"
                alt="Featured Shoe"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Shoe Collection */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-gray-50 rounded-xl">
        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map(category => (
            <motion.button
              key={category.id}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory(category.id)}
              className={`px-5 py-2 rounded-lg font-medium text-sm md:text-base transition-all ${
                activeCategory === category.id 
                  ? 'bg-black text-white' 
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              {category.name}
            </motion.button>
          ))}
        </div>
        
        {/* Shoe Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredShoes.map((shoe, index) => (
            <motion.div
              key={shoe.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="aspect-square relative bg-gray-100 rounded-lg overflow-hidden mb-4">
                <Image
                  src={shoe.image}
                  alt={shoe.name}
                  fill
                  className="object-contain transition-all duration-300 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              
              <div className="mt-2">
                <h3 className="font-semibold text-lg">{shoe.name}</h3>
                <div className="flex justify-between items-center mt-4">
                  <p className="text-gray-800 font-medium">${shoe.price.toFixed(2)}</p>
                  <div className="flex gap-1">
                    {colorOptions.slice(0, shoe.colors).map((color, i) => (
                      <div 
                        key={i}
                        className="w-4 h-4 rounded-full border border-gray-300"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full mt-4 bg-black text-white py-2 rounded-lg font-medium hover:bg-gray-800 transition-all"
                >
                  Add to Cart
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ShoeCollectionPage;