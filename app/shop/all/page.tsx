'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight, ChevronRight, Star, ShoppingBag, Heart } from 'lucide-react'

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
  const [featuredProducts, setFeaturedProducts] = useState([])

  const toggleWishlist = (id: number) => {
    setWishlist(prev => prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id])
  }

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("/api/products")
        const data = await res.json()
        setFeaturedProducts(data)
      } catch (err) {
        console.error("Failed to fetch products", err)
      }
    }
    fetchProducts()
  }, [])

  return (
    <div className="bg-white text-black min-h-screen">
      {/* Hero section, categories, stats, brand story, newsletter remain the same */}

      {/* Featured Products Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-14 text-center">Signature Pieces</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {featuredProducts.map((product: any) => (
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
                    <Heart className={`h-5 w-5 ${wishlist.includes(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
                  </button>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-xl font-bold">{product.name}</h3>
                      <p className="text-gray-600 capitalize">{product.category}</p>
                    </div>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="ml-1">4.8</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <div className="flex gap-2">
                      {[product.color || '#000'].map((color: string, i: number) => (
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
    </div>
  )
}
