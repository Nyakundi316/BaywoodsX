"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

const categories = [
  {
    name: "Sneakers",
    image: "https://i.pinimg.com/736x/57/80/09/578009ae4c2733357cc002ca74fe96e2.jpg",
    link: "/shop?category=sneakers"
  },
  {
    name: "Caps",
    image: "https://i.pinimg.com/736x/e0/df/75/e0df759d3cf890d65f2818c98ec7dc09.jpg",
    link: "/shop?category=caps"
  },
  {
    name: "Sweatpants",
    image: "https://i.pinimg.com/736x/01/78/08/017808fac7ee0f1eb0f2e88ef3ebbe86.jpg",
    link: "/shop?category=sweatpants"
  },
  {
    name: "Gym Wear",
    image: "https://images.pexels.com/photos/7991604/pexels-photo-7991604.jpeg?auto=compress&cs=tinysrgb&h=750&w=800",
    link: "/shop?category=gymwear"
  },
  {
    name: "Hoodies",
    image: "https://i.pinimg.com/736x/25/dc/bf/25dcbf493c17896a45eeeb9b8f1ba218.jpg",
    link: "/shop?category=hoodies"
  }
];

export default function HeroSection() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section className="relative bg-white text-black overflow-hidden">
      {/* Background Image with Parallax Effect - Fixed Implementation */}
      <div className="absolute inset-0 -z-10 h-[120vh] overflow-hidden">
        {isMounted && (
          <motion.div
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="absolute inset-0 w-full h-full"
          >
            {/* Using standard img tag for background to avoid hydration issues */}
            <img
              src="https://images.unsplash.com/photo-1491553895911-0055eca6402d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80"
              alt="Urban streetwear fashion"
              className="absolute inset-0 w-full h-full object-cover"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />
          </motion.div>
        )}
      </div>

      {/* Hero Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 min-h-[90vh] flex flex-col justify-center items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="max-w-4xl"
        >
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-4"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-black to-gray-300">
              BAYWOODS
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="text-lg sm:text-xl md:text-2xl font-medium text-black mb-8 max-w-2xl mx-auto"
          >
            Streetwear for the bold. Crafted for the urban explorer.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 1 }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <Link
              href="/shop"
              className="relative px-8 py-3 sm:py-4 rounded-full bg-white text-black font-bold text-lg overflow-hidden group"
            >
              <span className="relative z-10">Shop Collection</span>
              <span className="absolute inset-0 bg-gradient-to-r from-white to-gray-200 group-hover:opacity-90 transition-opacity" />
            </Link>
            <Link
              href="/new-arrivals"
              className="relative px-8 py-3 sm:py-4 rounded-full border-2 border-white text-white font-bold text-lg overflow-hidden group"
            >
              <span className="relative z-10">New Arrivals</span>
              <span className="text-black absolute inset-0 bg-black/10 group-hover:bg-gray/20 transition-colors" />
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Category Cards - Using Next.js Image component properly */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-16 pt-8 sm:pt-12">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="mb-8 text-center"
        >
          <h2 className="text-2xl sm:text-3xl font-bold mb-2">Shop by Category</h2>
          <p className="text-gray-400 max-w-lg mx-auto">Discover our curated collections for every style</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="relative"
        >
          <div className="flex overflow-x-auto pb-8 -mx-4 px-4 scrollbar-hide">
            <div className="flex space-x-6">
              {categories.map((cat, index) => (
                <motion.div
                  key={cat.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.5 }}
                  className="flex-shrink-0 w-72 sm:w-80 md:w-96"
                >
                  <Link
                    href={cat.link}
                    className="group block overflow-hidden rounded-2xl border border-gray-800 hover:border-gray-600 transition-all duration-300"
                  >
                    <div className="relative h-64 sm:h-80 w-full overflow-hidden">
                      <Image
                        src={cat.image}
                        alt={cat.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        quality={90}
                        priority={index < 3} // Prioritize first few images
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                      <div className="absolute bottom-0 left-0 p-6">
                        <h3 className="text-2xl font-bold text-white group-hover:text-gray-300 transition-colors">
                          {cat.name}
                        </h3>
                        <p className="text-white mt-1">Explore collection →</p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 hidden lg:block">
            <div className="text-xs text-gray-500 bg-black/50 backdrop-blur px-2 py-1 rounded-full">
              ← Scroll to explore →
            </div>
          </div>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute top-1/4 left-10 w-32 h-32 rounded-full bg-white/10 blur-xl"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.15 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="absolute bottom-1/4 right-20 w-40 h-40 rounded-full bg-purple-500/20 blur-xl"
      />
    </section>
  );
}