'use client';

import { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import FilterPage from '../components/FilterPage';

interface Product {
  id: number;
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

export default function ShoesPage() {
  const [filters, setFilters] = useState({});
  const [sortBy, setSortBy] = useState('relevance');
  const [products, setProducts] = useState<Product[]>([]);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Replace with your actual API endpoint
        const response = await fetch('https://your-backend-api.com/products', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            filters,
            sortBy
          })
        });

        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }

        const data = await response.json();

        // Transform the backend data to match our frontend interface
        const formattedProducts = data.products.map((product: any) => ({
          id: product.id,
          name: product.name,
          price: product.price,
          originalPrice: product.originalPrice,
          image: product.primaryImageUrl, // Main image URL
          images: product.imageUrls || [], // Array of all image URLs
          slug: product.slug,
          brand: product.brandName,
          isNew: product.isNewArrival,
          isBestSeller: product.isBestSeller,
          rating: product.averageRating
        }));

        setProducts(formattedProducts);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
        console.error('Error fetching new products:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [filters, sortBy]);

  // Handle filter changes
  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
    const active = Object.entries(newFilters)
      .flatMap(([key, values]) =>
        Array.isArray(values) ? values.map(value => `${key}: ${value}`) : []
      );
    setActiveFilters(active);
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters({});
    setActiveFilters([]);
  };

  // Handle retry for error state
  const handleRetry = () => {
    setError(null);
    // The useEffect will trigger again because error state changed
  };

  if (error) {
    return (
      <div className="min-h-screen bg-white text-black flex flex-col items-center justify-center p-4">
        <div className="max-w-md text-center">
          <h2 className="text-2xl font-bold mb-4">Error Loading Products</h2>
          <p className="text-gray-700 mb-6">{error}</p>
          <button
            onClick={handleRetry}
            className="px-6 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-black">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters sidebar */}
          <div className="w-full md:w-1/4">
            <FilterPage
              filters={filters}
              setFilters={handleFilterChange}
            />
          </div>

          {/* Main content */}
          <div className="w-full md:w-3/4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
              <h1 className="text-3xl font-bold mb-2 md:mb-0">New Shoes Collection</h1>
              <div className="flex items-center gap-4">
                {!isLoading && (
                  <span className="text-gray-700">{products.length} items found</span>
                )}
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none pl-3 pr-8 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                    disabled={isLoading}
                  >
                    <option value="relevance">Sort by: Relevance</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="newest">Newest First</option>
                    <option value="bestseller">Best Sellers</option>
                    <option value="rating">Top Rated</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-6 text-gray-700">
              <p>Find what you're looking for? Browse our latest collection of premium shoes.</p>
            </div>

            {/* Active filters */}
            {activeFilters.length > 0 && (
              <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="font-bold mr-2">Your Selections:</h2>
                  {activeFilters.map((filter, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-200 rounded-full text-sm flex items-center"
                    >
                      {filter}
                      <button
                        onClick={() => {
                          // Implement logic to remove this specific filter
                          const [key, value] = filter.split(': ');
                          // Update filters state
                        }}
                        className="ml-2 text-gray-500 hover:text-black"
                      >
                        &times;
                      </button>
                    </span>
                  ))}
                  <button
                    onClick={clearFilters}
                    className="ml-auto text-sm text-blue-600 hover:text-blue-800 hover:underline"
                  >
                    Clear all filters
                  </button>
                </div>
              </div>
            )}

            {/* Product grid */}
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, index) => (
                  <div key={index} className="animate-pulse">
                    <div className="bg-gray-200 h-64 rounded-lg"></div>
                    <div className="mt-3 space-y-2">
                      <div className="h-4 bg-gray-200 rounded"></div>
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : products.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map(product => (
                    <ProductCard
                      key={product.id}
                      product={{
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        originalPrice: product.originalPrice,
                        image: product.image,
                        slug: product.slug,
                        images: product.images,
                        brand: product.brand,
                        isNew: product.isNew,
                        isBestSeller: product.isBestSeller,
                        rating: product.rating,
                      }}
                    />


                  ))}
                </div>

                {/* Pagination */}
                <div className="mt-8 flex justify-center">
                  <nav className="flex items-center gap-1">
                    <button className="px-3 py-1 rounded border border-gray-300 bg-white text-black hover:bg-gray-100">
                      Previous
                    </button>
                    <button className="px-3 py-1 rounded border border-black bg-black text-white">
                      1
                    </button>
                    <button className="px-3 py-1 rounded border border-gray-300 bg-white text-black hover:bg-gray-100">
                      2
                    </button>
                    <button className="px-3 py-1 rounded border border-gray-300 bg-white text-black hover:bg-gray-100">
                      3
                    </button>
                    <span className="px-2">...</span>
                    <button className="px-3 py-1 rounded border border-gray-300 bg-white text-black hover:bg-gray-100">
                      8
                    </button>
                    <button className="px-3 py-1 rounded border border-gray-300 bg-white text-black hover:bg-gray-100">
                      Next
                    </button>
                  </nav>
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl font-medium mb-2">No products found</h3>
                <p className="text-gray-600 mb-4">Try adjusting your filters or search criteria</p>
                <button
                  onClick={clearFilters}
                  className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}