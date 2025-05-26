// app/shop/[slug]/page.tsx
'use client';

import { notFound } from 'next/navigation';
import ProductDetail from '../../components/ProductDetail';
const mockProducts = [
  {
    slug: 'nike-air-max',
    name: 'Nike Air Max',
    price: 'KES 17,999',
    description: 'Lightweight and bold sneakers crafted for street performance.',
    image: 'https://images.unsplash.com/photo-1600185365137-0fbb4f79aa62',
  },
  {
    slug: 'gym-hoodie',
    name: 'Gym Hoodie',
    price: 'KES 6,500',
    description: 'Premium cotton hoodie designed for comfort and movement.',
    image: 'https://images.unsplash.com/photo-1599058917212-d750089bc06b',
  },
  {
    slug: 'new-era-cap',
    name: 'New Era Cap',
    price: 'KES 4,800',
    description: 'Iconic cap with perfect fit and street-ready vibe.',
    image: 'https://images.unsplash.com/photo-1584811914966-19566cfe638b',
  },
];

export default function ProductSlugPage({ params }: { params: { slug: string } }) {
  const product = mockProducts.find((p) => p.slug === params.slug);

  if (!product) return notFound();

  return (
    <ProductDetail
      name={product.name}
      price={product.price}
      description={product.description}
      image={product.image}
    />
  );
}
