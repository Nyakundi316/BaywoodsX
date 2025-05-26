"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";

export default function ClothingPage() {
  const [products, setProducts] = useState([]);
  const [selectedSize, setSelectedSize] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("http://127.0.0.1:5000/api/products?category=clothing");

        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Failed to fetch clothing products", err);
      }
    }
    fetchData();
  }, []);

  const filteredProducts = selectedSize
    ? products.filter((p) => p.sizes?.includes(selectedSize))
    : products;

  const addToCart = (item) => {
    const existing = JSON.parse(localStorage.getItem("baywoods-cart") || "[]");
    const updatedCart = [...existing, { ...item, quantity: 1 }];
    localStorage.setItem("baywoods-cart", JSON.stringify(updatedCart));
    toast.success(`${item.name} added to cart`);
  };

  return (
    <section className="bg-white text-black py-16 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-10 text-center">Baywoods Clothing</h1>

        <div className="mb-8 flex gap-4 items-center justify-center flex-wrap">
          <span className="font-semibold">Filter by size:</span>
          {["S", "M", "L", "XL"].map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size === selectedSize ? "" : size)}
              className={`px-4 py-2 rounded border ${selectedSize === size ? "bg-black text-white" : "bg-gray-100 hover:bg-gray-200"}`}
            >
              {size}
            </button>
          ))}
          {selectedSize && (
            <button
              onClick={() => setSelectedSize("")}
              className="ml-2 text-sm text-blue-600 underline"
            >
              Clear Filter
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((item, i) => (
            <div
              key={i}
              className="bg-gray-50 border border-gray-200 rounded-xl overflow-hidden shadow hover:shadow-md transition-shadow"
            >
              <div className="relative w-full h-80">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4 text-left">
                <h3 className="font-semibold text-lg mb-1">{item.name}</h3>
                <p className="text-gray-800 font-medium mb-2">{item.price}</p>
                <button
                  onClick={() => addToCart(item)}
                  className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
