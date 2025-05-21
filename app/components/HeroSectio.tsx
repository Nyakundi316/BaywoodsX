"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const categories = [
  {
    name: "Sneakers",
    image: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&h=750&w=800",
    link: "/shop?category=sneakers"
  },
  {
    name: "Caps",
    image: "https://images.pexels.com/photos/1488467/pexels-photo-1488467.jpeg?auto=compress&cs=tinysrgb&h=750&w=800",
    link: "/shop?category=caps"
  },
  {
    name: "Sweatpants",
    image: "https://images.pexels.com/photos/1078974/pexels-photo-1078974.jpeg?auto=compress&cs=tinysrgb&h=750&w=800",
    link: "/shop?category=sweatpants"
  },
  {
    name: "Gym Wear",
    image: "https://images.pexels.com/photos/7991604/pexels-photo-7991604.jpeg?auto=compress&cs=tinysrgb&h=750&w=800",
    link: "/shop?category=gymwear"
  }
];

export default function HeroSection() {
  return (
    <section className="bg-white text-black px-6 text-center overflow-hidden pb-20">
      <div className="min-h-[60vh] flex flex-col justify-center items-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl md:text-7xl font-extrabold tracking-wide"
        >
          BAYWOODS
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mt-4 text-lg md:text-2xl text-gray-800"
        >
          Streetwear For The Bold.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-8"
        >
          <Link
            href="/shop"
            className="bg-black text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-gray-900 transition"
          >
            Shop Collection
          </Link>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="mt-12 flex overflow-x-auto space-x-6 px-1 sm:px-4 max-w-full md:max-w-6xl mx-auto scrollbar-hide"
      >
        {categories.map((cat) => (
          <Link
            key={cat.name}
            href={cat.link}
            className="group flex-shrink-0 w-64 sm:w-72 md:w-64 block overflow-hidden rounded-xl border border-gray-200 hover:shadow-xl transition-transform duration-300 hover:scale-105"
          >
            <div className="relative h-48 sm:h-56 md:h-64 w-full overflow-hidden">
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold group-hover:text-gray-700">{cat.name}</h3>
              <p className="text-sm text-gray-500 mt-1">Explore our latest {cat.name.toLowerCase()} collection.</p>
            </div>
          </Link>
        ))}
        <div className="flex justify-center mt-6">
          <div className="text-sm text-gray-500">← Swipe to explore →</div>
        </div>
      </motion.div>
    </section>
  );
}
