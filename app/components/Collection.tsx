// app/collection/page.tsx
'use client';

import { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import { ShoppingCart } from 'lucide-react';

interface Product {
  name: string;
  price: string;
  image: string;
  images?: string[];
  slug: string;
  brand: string;
  quantity?: number;
}

export default function CollectionPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<Product[]>([]);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => setProducts(data));

    const storedCart = JSON.parse(localStorage.getItem('baywoods-cart') || '[]');
    setCart(storedCart);
  }, []);

  const addToCart = (product: Product) => {
    const existing = cart.find(p => p.slug === product.slug);
    let updatedCart;

    if (existing) {
      updatedCart = cart.map(p => p.slug === product.slug ? { ...p, quantity: (p.quantity || 1) + 1 } : p);
    } else {
      updatedCart = [...cart, { ...product, quantity: 1 }];
    }

    setCart(updatedCart);
    localStorage.setItem('baywoods-cart', JSON.stringify(updatedCart));
  };

  const brands = [
    'Nike', 'Balenciaga', 'Adidas', 'Prada', 'Vans', 'Asics', 'New Balance',
    'Dr. Martens', 'Amiri', 'Jordans', 'LV', 'Dior', 'Hommies',
    'Timberlands', 'Air Max', 'Clarks', 'Official'
  ];

  return (
    <div className="min-h-screen w-full bg-white">
      <div className="max-w-[90rem] mx-auto px-6 py-16">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-black">🔥 Baywoods Shoe Collection</h1>
          <div className="relative">
            <ShoppingCart className="w-7 h-7 text-black" />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-2">
                {cart.reduce((acc, item) => acc + (item.quantity || 1), 0)}
              </span>
            )}
          </div>
        </div>

        {brands.map((brand) => {
          const brandProducts = products.filter(p => p.brand === brand);
          return (
            <div key={brand} className="mb-20">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 border-b pb-3 border-gray-300">{brand}</h2>
              {brandProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                  {brandProducts.map((product, index) => (
                    <div key={index} className="relative group shadow rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105 hover:ring-2 hover:ring-black">
                      <ProductCard
                        name={product.name}
                        price={product.price}
                        image={product.image}
                        images={product.images}
                        slug={product.slug}
                      />
                      <button
                        onClick={() => addToCart(product)}
                        className="absolute top-3 right-3 bg-black text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition hover:bg-gray-800"
                      >
                        <ShoppingCart size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-700 italic">No products available under <strong>{brand}</strong> yet.</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
