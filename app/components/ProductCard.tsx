// app/components/ui/ProductCard.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

interface ProductCardProps {
  name: string;
  price: string;
  originalPrice?: string;
  image: string;
  slug: string;
  images: string[];
  brand?: string;
  isNew?: boolean;
  isBestSeller?: boolean;
  rating?: number;
}

export default function ProductCard({ name, price, image, images, slug }: ProductCardProps) {
  const [hovered, setHovered] = useState(false);
  const mainImage = !hovered || !images || images.length < 2 ? image : images[1];

  return (
    <Link
      href={slug ? `/shop/${slug}` : '#'}
      className="block bg-white rounded-lg shadow hover:shadow-lg overflow-hidden transition-transform transform hover:-translate-y-1"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative h-64 w-full">
        <Image
          src={mainImage}
          alt={name}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4 text-center">
        <h3 className="font-semibold text-lg mb-1 text-gray-900">{name}</h3>
        <p className="text-gray-700">{price}</p>
      </div>
    </Link>
  );
}
