"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function NewArrivals() {
  const products = [
    {
      name: "Nike Air Max",
      price: "KES 17,999",
      tag: "New",
      category: "sneakers",
      image: "https://images.unsplash.com/photo-1600185365137-0fbb4f79aa62?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "New Era Cap",
      price: "KES 4,800",
      tag: "Sale",
      category: "caps",
      image: "https://images.unsplash.com/photo-1584811914966-19566cfe638b?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Gym Hoodie",
      price: "KES 6,500",
      tag: "New",
      category: "gymwear",
      image: "https://images.unsplash.com/photo-1599058917212-d750089bc06b?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Sweatpants",
      price: "KES 7,200",
      tag: "",
      category: "sweatpants",
      image: "https://images.unsplash.com/photo-1598970434795-0c54fe7c0642?auto=format&fit=crop&w=800&q=80",
    },
  ];

  return (
    <section className="bg-white text-black px-6 py-16">
      <div className="max-w-6xl mx-auto">
        <div className="text-sm text-gray-500 mb-4">
          <Link href="/">Home</Link> /{" "}
          <span className="text-black font-medium">New Arrivals</span>
        </div>

        <div className="text-center">
          <h2 className="text-4xl font-bold mb-4">New Arrivals</h2>
          <p className="text-gray-600 mb-8">
            Check out the latest drops from Baywoods — fresh sneakers, stylish caps, and more.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((item, i) => (
            <motion.div
              key={i}
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: i * 0.1, duration: 0.5, ease: "easeOut" }}
              whileHover={{ scale: 1.05 }}
              className="cursor-pointer"
            >
              <Link href={`/collection/${item.category}`}>
                <div className="bg-gray-50 border border-gray-200 rounded-xl overflow-hidden transform transition-transform hover:shadow-xl">
                  <div className="relative h-64 w-full">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                    {item.tag && (
                      <span className="absolute top-3 left-3 bg-black text-white text-xs px-3 py-1 rounded-full">
                        {item.tag}
                      </span>
                    )}
                  </div>
                  <div className="p-4 text-left">
                    <h3 className="font-semibold text-lg mb-1">{item.name}</h3>
                    <p className="text-gray-800 font-medium">{item.price}</p>
                    <span className="mt-3 inline-block bg-black text-white px-4 py-2 text-sm rounded hover:bg-gray-900 transition">
                      Shop Now
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/shop"
            className="inline-block bg-black text-white px-6 py-3 rounded-full font-semibold hover:bg-gray-900"
          >
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
}
