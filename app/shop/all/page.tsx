'use client'

import { useState } from 'react' // Add this import
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight, ChevronRight, Star, ShoppingBag, Heart } from 'lucide-react'

// ... (rest of your code remains exactly the same)

const categories = [
  {
    name: 'Sneakers',
    href: '/shop/shoes',
    image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg',
    description: 'Premium footwear engineered for performance'
  },
  {
    name: 'Accessories',
    href: '/shop/accessories',
    image: 'https://images.pexels.com/photos/2983464/pexels-photo-2983464.jpeg',
    description: 'Essential complements to complete your look'
  },
  {
    name: 'Streetwear',
    href: '/shop/clothing',
    image: 'https://images.pexels.com/photos/1032115/pexels-photo-1032115.jpeg',
    description: 'Urban-inspired apparel with premium craftsmanship'
  },
  {
    name: 'Headwear',
    href: '/shop/caps',
    image: 'https://images.pexels.com/photos/1755682/pexels-photo-1755682.jpeg',
    description: 'Signature caps for every occasion'
  },
  {
    name: 'Athleisure',
    href: '/shop/gymwear',
    image: 'https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg',
    description: 'Performance meets street-ready style'
  },
  {
    name: 'New Arrivals',
    href: '/shop/new',
    image: 'https://images.pexels.com/photos/842811/pexels-photo-842811.jpeg',
    description: 'Fresh drops for the fashion-forward'
  }
]

const featuredProducts = [
  {
    id: 1,
    name: 'Pro Runner X',
    price: 'KES 12,999',
    category: 'sneakers',
    image: 'https://images.pexels.com/photos/1478442/pexels-photo-1478442.jpeg',
    rating: 4.8,
    colors: ['#000000', '#2D3748', '#718096']
  },
  {
    id: 2,
    name: 'Urban Backpack',
    price: 'KES 5,499',
    category: 'accessories',
    image: 'https://images.pexels.com/photos/2905238/pexels-photo-2905238.jpeg',
    rating: 4.5,
    colors: ['#1A202C', '#4A5568']
  },
  {
    id: 3,
    name: 'Performance Tee',
    price: 'KES 3,299',
    category: 'gymwear',
    image: 'https://images.pexels.com/photos/428340/pexels-photo-428340.jpeg',
    rating: 4.7,
    colors: ['#FFFFFF', '#000000', '#E2E8F0']
  }
]

const stats = [
  { value: '10,000+', label: 'Satisfied Customers' },
  { value: '5 Years', label: 'Crafting Excellence' },
  { value: '98%', label: 'Positive Feedback' }
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3
    }
  }
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100
    }
  }
}

export default function AllProductsPage() {
  const [wishlist, setWishlist] = useState<number[]>([])

  const toggleWishlist = (id: number) => {
    setWishlist(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id) 
        : [...prev, id]
    )
  }

  return (
    <div className="bg-white text-black min-h-screen">
      {/* Hero Section */}
      <div className="relative h-screen max-h-[800px] overflow-hidden">
        <Image
          src="https://images.pexels.com/photos/1300550/pexels-photo-1300550.jpeg"
          alt="Luxury streetwear collection"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent flex items-end pb-20">
          <div className="max-w-7xl mx-auto px-6 w-full">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-2xl"
            >
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                Redefine Your Style
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Discover our curated collection of premium streetwear and athletic essentials.
              </p>
              <div className="flex gap-4">
                <Link
                  href="/shop/new"
                  className="flex items-center px-8 py-4 bg-white text-black rounded-full font-medium hover:bg-gray-100 transition-all duration-300"
                >
                  Shop Collection
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  href="/about"
                  className="flex items-center px-8 py-4 border-2 border-white text-white rounded-full font-medium hover:bg-white hover:text-black transition-all duration-300"
                >
                  Our Story
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Featured Categories */}
      <section className="py-20 max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold">Collections</h2>
          <Link 
            href="/shop" 
            className="flex items-center group text-lg font-medium"
          >
            Browse all
            <ChevronRight className="ml-1 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {categories.map((category, index) => (
            <motion.div 
              key={category.name} 
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="group relative overflow-hidden rounded-xl"
            >
              <Link href={category.href}>
                <div className="relative aspect-[4/5]">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover transition-all duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={index < 3}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 p-6 w-full">
                  <div className="flex justify-between items-end">
                    <div>
                      <h3 className="text-2xl font-bold text-white">{category.name}</h3>
                      <p className="text-gray-300">{category.description}</p>
                    </div>
                    <div className="bg-white text-black p-3 rounded-full transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                      <ArrowRight className="h-5 w-5" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-14 text-center">Signature Pieces</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {featuredProducts.map((product) => (
              <motion.div 
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative aspect-square">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                  <button 
                    onClick={() => toggleWishlist(product.id)}
                    className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
                  >
                    <Heart 
                      className={`h-5 w-5 ${wishlist.includes(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} 
                    />
                  </button>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-xl font-bold">{product.name}</h3>
                      <p className="text-gray-600">{product.category}</p>
                    </div>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="ml-1">{product.rating}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex gap-2">
                      {product.colors.map((color, i) => (
                        <div 
                          key={i} 
                          className="w-5 h-5 rounded-full border border-gray-200"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                    <p className="text-lg font-bold">{product.price}</p>
                  </div>
                  
                  <button className="w-full mt-6 py-3 bg-black text-white rounded-lg flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors">
                    <ShoppingBag className="h-5 w-5" />
                    Add to Cart
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Story */}
      <section className="py-20 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Crafting Excellence Since 2018</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Baywoods began as a passion project in Nairobi, born from the desire to bring premium streetwear to East Africa. 
              Each piece in our collection reflects our commitment to quality materials, meticulous craftsmanship, and timeless design.
            </p>
            <p className="text-gray-600 mb-8 leading-relaxed">
              We collaborate with local artisans and global manufacturers to create apparel that bridges the gap between street culture 
              and high fashion, delivering pieces that are as durable as they are stylish.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center px-8 py-3 border-2 border-black rounded-full font-medium hover:bg-black hover:text-white transition-all duration-300"
            >
              Our Journey
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-4"
          >
            <div className="relative aspect-square rounded-xl overflow-hidden">
              <Image
                src="https://images.pexels.com/photos/3184398/pexels-photo-3184398.jpeg"
                alt="Craftsmanship"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative aspect-square rounded-xl overflow-hidden">
              <Image
                src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg"
                alt="Store interior"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative aspect-square rounded-xl overflow-hidden col-span-2">
              <Image
                src="https://images.pexels.com/photos/3738084/pexels-photo-3738084.jpeg"
                alt="Design process"
                fill
                className="object-cover"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-black text-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="p-8">
                <p className="text-5xl font-bold mb-3">{stat.value}</p>
                <p className="text-gray-300 text-lg">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-gray-50 rounded-2xl p-12 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Join the Movement</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Subscribe for exclusive access to new releases, special offers, and style inspiration.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-6 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
            <button className="px-8 py-3 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-colors">
              Subscribe
            </button>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </motion.div>
      </section>
    </div>
  )
}