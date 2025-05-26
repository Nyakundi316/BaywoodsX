'use client';

import Image from 'next/image';

const accessories = [
  {
    name: 'Leather Wallet',
    price: 'KES 3,500',
    image: 'https://images.unsplash.com/photo-1589487391732-df1c46ab1235',
  },
  {
    name: 'Bracelet Set',
    price: 'KES 1,800',
    image: 'https://images.unsplash.com/photo-1617692853022-7ad0c139f4fc',
  },
  {
    name: 'Streetwear Cap Clip',
    price: 'KES 950',
    image: 'https://images.unsplash.com/photo-1579705731476-65c1bd1f6648',
  },
];

export default function AccessoriesPage() {
  return (
    <div className="px-6 py-12 max-w-6xl mx-auto bg-white">
      <h1 className="text-3xl font-bold mb-6 capitalize">Accessories Collection</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {accessories.map((item, i) => (
          <div
            key={i}
            className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition"
          >
            <div className="relative h-64 w-full">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4 text-center">
              <h3 className="font-semibold text-lg mb-1">{item.name}</h3>
              <p className="text-gray-700">{item.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
