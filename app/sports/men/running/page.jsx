"use client"

import { useEffect, useState } from 'react';
import Head from 'next/head';
import ProductCard from '../../../components/ProductCard';
import FilterSidebar from '../../../components/FilterSidebar';
import SortDropdown from '../../../components/SortDropdown';

export default function MenRunners() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filters, setFilters] = useState({
    brand: [],
    color: [],
    type: [],
    priceRange: [0, 30000],
    onSale: false
  });

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch('/api/products?type=men-runners');
        if (!res.ok) throw new Error('Failed to fetch products');
        const data = await res.json();
        setProducts(data);
        setFilteredProducts(data);
      } catch (err) {
        console.error('Error fetching products:', err);
      }
    }
    fetchProducts();
  }, []);

  const brands = [...new Set(products.map(p => p.brand))];
  const colors = [...new Set(products.flatMap(p => p.colors || []))];
  const productTypes = [...new Set(products.map(p => p.type))];

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    const filtered = products.filter(product => {
      if (newFilters.brand.length > 0 && !newFilters.brand.includes(product.brand)) return false;
      if (newFilters.color.length > 0 && !(product.colors || []).some(c => newFilters.color.includes(c))) return false;
      if (newFilters.type.length > 0 && !newFilters.type.includes(product.type)) return false;
      const price = parseFloat(product.price.replace(/[^0-9.]/g, '')) || 0;
      if (price < newFilters.priceRange[0] || price > newFilters.priceRange[1]) return false;
      if (newFilters.onSale && !product.originalPrice) return false;
      return true;
    });
    setFilteredProducts(filtered);
  };

  const handleSortChange = (sortOption) => {
    let sorted = [...filteredProducts];
    switch (sortOption) {
      case 'price-low-high':
        sorted.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        break;
      case 'price-high-low':
        sorted.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
        break;
      case 'rating':
        sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      default:
        break;
    }
    setFilteredProducts(sorted);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Men Runners | Baywoods</title>
        <meta name="description" content="Explore the best men's running sneakers at Baywoods." />
      </Head>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Men Runners</h1>
          <p className="text-gray-600 mt-2">{filteredProducts.length} items found</p>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/4">
            <FilterSidebar
              brands={brands}
              colors={colors}
              productTypes={productTypes}
              filters={filters}
              onChange={handleFilterChange}
            />
          </div>

          <div className="md:w-3/4">
            <div className="flex justify-between items-center mb-6">
              <span className="text-sm text-gray-600">Sort By</span>
              <SortDropdown onChange={handleSortChange} />
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium text-gray-900">No products found</h3>
                <p className="mt-2 text-gray-600">Try adjusting your filters to find what you're looking for.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
