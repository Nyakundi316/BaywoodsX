"use client";
import { HeartIcon, StarIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import PropTypes from 'prop-types';

export default function ProductCard({ product }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const toggleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  const formatPrice = (price) => {
    const numeric = typeof price === 'number' ? price : parseFloat(price);
    return isNaN(numeric) ? '0.00' : numeric.toFixed(2);
  };

  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image */}
      <div className="relative">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-64 object-cover transition-transform duration-300 hover:scale-105"
          loading="lazy"
        />
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col space-y-1">
          {product.isNew && (
            <span className="bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded">New</span>
          )}
          {product.isSponsored && (
            <span className="bg-purple-500 text-white text-xs font-semibold px-2 py-1 rounded">Sponsored</span>
          )}
          {product.isLowStock && (
            <span className="bg-yellow-500 text-white text-xs font-semibold px-2 py-1 rounded">Low Stock</span>
          )}
        </div>
        {/* Favorite Button */}
        <button 
          onClick={toggleFavorite}
          className="absolute top-2 right-2 p-2 bg-white rounded-full shadow hover:bg-gray-100 transition-colors"
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <HeartIcon className={`h-5 w-5 ${isFavorite ? 'text-red-500 fill-current' : 'text-gray-400'}`} />
        </button>
        {/* Quick View */}
        {isHovered && (
          <button className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-black text-white px-4 py-2 rounded-md text-sm font-medium opacity-90 hover:opacity-100 transition-opacity">
            Quick View
          </button>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-medium text-gray-900 line-clamp-1" title={product.name}>{product.name}</h3>
            <p className="text-sm text-gray-500">{product.brand}</p>
          </div>
          <div className="flex items-center">
            <StarIcon className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="ml-1 text-sm text-gray-600">
              {product.rating} ({product.reviewCount})
            </span>
          </div>
        </div>

        {/* Price */}
        <div className="mt-2">
          {product.originalPrice ? (
            <div className="flex items-center flex-wrap">
              <span className="text-lg font-bold text-gray-900">
                ${formatPrice(product.price)}
              </span>
              <span className="ml-2 text-sm text-gray-500 line-through">
                ${formatPrice(product.originalPrice)}
              </span>
              <span className="ml-2 text-sm text-red-600">
                {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
              </span>
            </div>
          ) : (
            <span className="text-lg font-bold text-gray-900">
              ${formatPrice(product.price)}
            </span>
          )}
        </div>

        {/* Colors */}
        {Array.isArray(product.colors) && product.colors.length > 0 && (
          <div className="mt-3">
            <div className="flex items-center space-x-2">
              <div className="flex -space-x-1">
                {product.colors.slice(0, 3).map((color, index) => (
                  <span 
                    key={index}
                    className="w-5 h-5 rounded-full border border-gray-200 shadow-sm hover:transform hover:scale-125 hover:z-10 transition-transform"
                    style={{ backgroundColor: color.toLowerCase() }}
                    title={color}
                    aria-label={color}
                  />
                ))}
              </div>
              {product.colors.length > 3 && (
                <span className="text-xs text-gray-500">+{product.colors.length - 3}</span>
              )}
            </div>
          </div>
        )}

        {/* Add to Cart */}
        <button 
          className="mt-4 w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50"
          aria-label={`Add ${product.name} to cart`}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    brand: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    reviewCount: PropTypes.number.isRequired,
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    originalPrice: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    colors: PropTypes.arrayOf(PropTypes.string),
    isNew: PropTypes.bool,
    isSponsored: PropTypes.bool,
    isLowStock: PropTypes.bool,
  }).isRequired,
};
