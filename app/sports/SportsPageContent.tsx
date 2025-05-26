// 'use client';

// import { useState } from 'react';
// import FilterPage from '../components/FilterPage';
// import ProductCard from '../components/ProductCard';

// interface Product {
//     id: number;
//     name: string;
//     price: string;
//     image: string;
//     slug: string;
// }

// interface Filters {
//     priceRange: [number, number];
//     brands: string[];
//     types: string[];
//     colors: string[];
//     sizes: string[];
//     inStock: boolean;
// }

// const defaultFilters: Filters = {
//     priceRange: [0, 500],
//     brands: [],
//     types: [],
//     colors: [],
//     sizes: [],
//     inStock: false
// };

// export default function SportsPageContent() {
//     const [filters, setFilters] = useState<Filters>({ ...defaultFilters });

//     const [products] = useState<Product[]>([
//         { id: 1, name: 'Running Shoes', price: 'KES 4,000', image: '/images/shoe1.jpg', slug: 'running-shoes' },
//         { id: 2, name: 'Training Sneakers', price: 'KES 6,500', image: '/images/shoe2.jpg', slug: 'training-sneakers' },
//         { id: 3, name: 'Basketball High Tops', price: 'KES 5,800', image: '/images/shoe3.jpg', slug: 'basketball-high-tops' }
//     ]);

//     const handleFilterChange = (newFilters: Partial<Filters>) => {
//         setFilters(prev => ({ ...prev, ...newFilters }));
//     };

//     const resetFilters = () => {
//         setFilters({ ...defaultFilters });
//     };

//     return (
//         <div className="min-h-screen bg-white text-black py-10 px-4">
//             <div className="max-w-7xl mx-auto">
//                 <h1 className="text-3xl font-bold mb-6">Sports Collection</h1>
//                 <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
//                     <div>
//                         <FilterPage
//                             filters={filters}
//                             onFilterChange={handleFilterChange}
//                             onReset={resetFilters}
//                             activeCategory="clothing"
//                         />
//                     </div>

//                     <div className="md:col-span-3">
//                         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                             {products.map(product => (
//                                 <ProductCard
//                                     key={product.id}
//                                     name={product.name}
//                                     price={product.price}
//                                     image={product.image}
//                                     images={[product.image]} // ✅ Fix: Provide at least one image
//                                     slug={product.slug}
//                                 />

//                             ))}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }
