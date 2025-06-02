"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const categories = ["All", "Sneakers", "Caps", "Pants", "Hoodies", "Gym Wear"];

export default function SalePage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [saleProducts, setSaleProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSaleActive, setIsSaleActive] = useState(false);

  const checkSaleDate = () => {
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1;
    return day === 25 && month % 2 === 0;
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://127.0.0.1:5000/api/sale-products");
        if (!response.ok) throw new Error("Failed to fetch products");

        const data = await response.json();
        setSaleProducts(data);
        setIsSaleActive(checkSaleDate());
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message);
        const fallbackData = [
          {
            id: 1,
            name: "Retro Runners",
            category: "Sneakers",
            price: 11000,
            discount: 20,
            colors: {
              black: [
                "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg"
              ]
            }
          },
          {
            id: 2,
            name: "Classic Cap",
            category: "Caps",
            price: 4800,
            discount: 30,
            colors: {
              red: [
                "https://images.pexels.com/photos/1584811914966-19566cfe638b.jpeg"
              ]
            }
          }
        ];
        setSaleProducts(fallbackData);
        setIsSaleActive(checkSaleDate());
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const getDiscountedPrice = (price, discount) => {
    return isSaleActive ? (price * (1 - discount / 100)).toFixed(0) : price;
  };

  const filteredProducts =
    activeCategory === "All"
      ? saleProducts
      : saleProducts.filter((p) => p.category === activeCategory);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  return (
    <section className="bg-white text-black min-h-screen">
      {/* Hero */}
      <div className="relative w-full h-[60vh] bg-black text-white flex items-center justify-center">
        <Image
          src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f"
          alt="Sale Banner"
          fill
          className="object-cover object-center opacity-60"
          priority
        />
        <div className="z-10 text-center px-4">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
            {isSaleActive ? "Baywoods Sale" : "Baywoods Collection"}
          </h1>
          <p className="text-lg md:text-xl max-w-xl mx-auto">
            {isSaleActive
              ? "Limited time offers on sneakers, caps, and more!"
              : "Explore our premium collection"}
          </p>
          {!isSaleActive && (
            <p className="mt-4 text-yellow-300">
              Next sale: 25th of{" "}
              {new Date().getMonth() % 2 === 0
                ? new Date(new Date().setMonth(new Date().getMonth() + 2)).toLocaleString(
                    "default",
                    { month: "long" }
                  )
                : new Date(new Date().setMonth(new Date().getMonth() + 1)).toLocaleString(
                    "default",
                    { month: "long" }
                  )}
            </p>
          )}
        </div>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap justify-center gap-4 px-6 py-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full font-medium text-sm md:text-base transition-all ${
              activeCategory === cat
                ? "bg-black text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Products */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-lg text-gray-500">No products found in this category</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredProducts.map((product, index) => {
              const displayPrice = getDiscountedPrice(product.price, product.discount);
              const productImage =
                Object.values(product.colors || {})[0]?.[0] ||
                "https://via.placeholder.com/400x400?text=No+Image";

              return (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white shadow-md rounded-xl overflow-hidden group hover:shadow-xl transition"
                >
                  <div className="relative w-full h-80">
                    <Image
                      src={productImage}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    {isSaleActive && (
                      <span className="absolute top-4 left-4 bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
                        -{product.discount}%
                      </span>
                    )}
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-bold mb-1">{product.name}</h3>
                    <p className="text-sm text-gray-500 mb-2">{product.category}</p>
                    <div className="flex items-center gap-3">
                      <span className="text-black font-semibold text-lg">
                        KES {parseInt(displayPrice).toLocaleString()}
                      </span>
                      {isSaleActive && (
                        <span className="line-through text-gray-400 text-sm">
                          KES {product.price.toLocaleString()}
                        </span>
                      )}
                    </div>
                    <button className="mt-4 w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition">
                      Add to Cart
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
