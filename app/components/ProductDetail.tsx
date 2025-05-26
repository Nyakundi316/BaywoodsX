// app/components/ui/ProductDetail.tsx
'use client';

import Image from 'next/image';

interface ProductDetailProps {
  name: string;
  price: string;
  description: string;
  image: string;
}

export default function ProductDetail({ name, price, description, image }: ProductDetailProps) {
  return (
    <div className="min-h-screen bg-white text-black px-6 py-12">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">
        <div className="relative w-full h-[500px] rounded-xl overflow-hidden shadow-md">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover"
          />
        </div>

        <div className="flex flex-col justify-center">
          <h1 className="text-4xl font-bold mb-4">{name}</h1>
          <p className="text-lg text-gray-600 mb-6">{description}</p>
          <p className="text-2xl font-semibold mb-6">{price}</p>

          <button className="bg-black text-white px-6 py-3 rounded-full hover:bg-gray-900 transition">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
