// app/shop/cart/page.tsx
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("baywoods-cart") || "[]");
    setCartItems(storedCart);
  }, []);

  const updateQuantity = (index, change) => {
    const updated = [...cartItems];
    updated[index].quantity = Math.max(1, updated[index].quantity + change);
    setCartItems(updated);
    localStorage.setItem("baywoods-cart", JSON.stringify(updated));
  };

  const removeItem = (index) => {
    const updated = [...cartItems];
    updated.splice(index, 1);
    setCartItems(updated);
    localStorage.setItem("baywoods-cart", JSON.stringify(updated));
  };

  const subtotal = cartItems.reduce((acc, item) => {
    const price = parseInt(item.price.replace("KES ", "")) || 0;
    return acc + price * item.quantity;
  }, 0);

  const handleCheckout = async () => {
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: cartItems }),
    });

    const data = await res.json();
    if (data.url) {
      window.location.href = data.url;
    }
  };
  const handleMpesaCheckout = async () => {
    const phone = prompt("Enter your Safaricom number:");

    const res = await fetch('/api/mpesa/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone, amount: subtotal })
    });

    const data = await res.json();
    console.log(data);
    alert("Check your phone to complete payment via M-Pesa.");
  };


  return (
    <section className="bg-white text-black py-16 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-10 text-center">Your Cart</h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-12 animate-fade-in">
            <p className="text-lg mb-2">🛒 Your cart is currently empty.</p>
            <Link href="/shop/all" className="text-blue-600 underline text-sm hover:text-blue-800">
              ← Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-in">
            <div className="lg:col-span-2 space-y-6">
              {cartItems.map((item, index) => (
                <div key={index} className="flex gap-4 items-start border-b pb-6">
                  <div className="relative w-28 h-28 rounded-lg overflow-hidden shadow-sm">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-1">{item.name}</h3>
                    <p className="text-gray-600 mb-2">{item.price}</p>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(index, -1)}
                        className="px-3 py-1 rounded-full bg-gray-200 hover:bg-gray-300 text-sm"
                      >
                        −
                      </button>
                      <span className="min-w-[20px] text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(index, 1)}
                        className="px-3 py-1 rounded-full bg-gray-200 hover:bg-gray-300 text-sm"
                      >
                        +
                      </button>
                      <button
                        onClick={() => removeItem(index)}
                        className="ml-4 text-red-600 text-sm hover:underline"
                      >
                        ✕ Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gray-100 p-6 rounded-xl shadow space-y-4 sticky top-24 h-fit animate-fade-in">
              <h2 className="text-xl font-semibold mb-4">🧾 Order Summary</h2>
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>KES {subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <hr />
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>KES {subtotal.toLocaleString()}</span>
              </div>
              <button
                onClick={handleCheckout}
                className="w-full mt-6 bg-black text-white py-3 rounded-lg hover:bg-gray-900 transition duration-200"
              >
                🚀 Proceed to Checkout
              </button>
            </div>
          </div>
        )}
        <button
          onClick={handleMpesaCheckout}
          className="w-full mt-6 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
        >
          Pay with M-Pesa
        </button>

      </div>
    </section>

  );
}
