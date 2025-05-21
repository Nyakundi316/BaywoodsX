"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

export default function ShoesPage() {
  const [products, setProducts] = useState([]);
  const [selectedSize, setSelectedSize] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const res = await fetch("/api/products?category=sneakers");
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Failed to fetch shoe products", err);
        toast.error("Failed to load products");
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  const filteredProducts = selectedSize
    ? products.filter((p) => p.sizes?.includes(selectedSize))
    : products;

  const addToCart = (item) => {
    try {
      const existing = JSON.parse(localStorage.getItem("baywoods-cart") || "[]");
      const existingItem = existing.find((i) => i.id === item.id);
      
      const updatedCart = existingItem
        ? existing.map((i) => 
            i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
          )
        : [...existing, { ...item, quantity: 1 }];
      
      localStorage.setItem("baywoods-cart", JSON.stringify(updatedCart));
      toast.success(`${item.name} added to cart`);
    } catch (err) {
      toast.error("Failed to add item to cart");
      console.error("Cart error:", err);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
      </div>
    );
  }

  return (
    <section className="bg-white text-black py-16 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold mb-10 text-center"
        >
          Baywoods Sneakers
        </motion.h1>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-8 flex gap-4 items-center justify-center flex-wrap"
        >
          <span className="font-semibold">Filter by size:</span>
          {["40", "41", "42", "43", "44", "45"].map((size) => (
            <motion.button
              key={size}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedSize(size === selectedSize ? "" : size)}
              className={`px-4 py-2 rounded border transition-colors ${
                selectedSize === size 
                  ? "bg-black text-white" 
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              {size}
            </motion.button>
          ))}
          {selectedSize && (
            <button
              onClick={() => setSelectedSize("")}
              className="ml-2 text-sm text-blue-600 underline hover:text-blue-800"
            >
              Clear Filter
            </button>
          )}
        </motion.div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium mb-2">No sneakers found</h3>
            <p className="text-gray-600 mb-4">
              {selectedSize 
                ? `No sneakers available in size ${selectedSize}`
                : "No sneakers available"}
            </p>
            {selectedSize && (
              <button
                onClick={() => setSelectedSize("")}
                className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
              >
                Show All Sneakers
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((item, i) => (
              <motion.div
                key={item.id || i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -5 }}
                className="bg-gray-50 border border-gray-200 rounded-xl overflow-hidden shadow hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => setSelectedProduct(item)}
              >
                <div className="relative w-full aspect-square">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={i < 4} // Prioritize loading first 4 images
                  />
                </div>
                <div className="p-4 text-left">
                  <h3 className="font-semibold text-lg mb-1">{item.name}</h3>
                  <p className="text-gray-800 font-medium mb-2">{item.price}</p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(item);
                    }}
                    className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
                  >
                    Add to Cart
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Product Detail Modal */}
        <AnimatePresence>
          {selectedProduct && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4"
              onClick={() => setSelectedProduct(null)}
            >
              <motion.div
                initial={{ scale: 0.95, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 20 }}
                className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative">
                  <button
                    onClick={() => setSelectedProduct(null)}
                    className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-100"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                  <div className="relative aspect-square">
                    <Image
                      src={selectedProduct.image}
                      alt={selectedProduct.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="text-2xl font-bold">{selectedProduct.name}</h2>
                      <p className="text-gray-500">{selectedProduct.price}</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-2">Available Sizes</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedProduct.sizes?.map((size) => (
                          <button
                            key={size}
                            className={`px-4 py-2 border rounded ${
                              size === selectedSize
                                ? "bg-black text-white"
                                : "hover:bg-gray-100"
                            }`}
                            onClick={() => setSelectedSize(size)}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        addToCart(selectedProduct);
                        setSelectedProduct(null);
                      }}
                      className="w-full bg-black text-white py-3 rounded hover:bg-gray-800 transition font-medium"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}