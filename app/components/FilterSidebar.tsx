import { useState, useCallback } from 'react';
import PropTypes from 'prop-types';

export default function FilterSidebar({ brands, colors, productTypes, filters, onChange }) {
  const [priceRange, setPriceRange] = useState(filters.priceRange);

  const handleBrandChange = useCallback((brand) => {
    const newBrands = filters.brand.includes(brand)
      ? filters.brand.filter(b => b !== brand)
      : [...filters.brand, brand];
    onChange({ ...filters, brand: newBrands });
  }, [filters, onChange]);

  const handleColorChange = useCallback((color) => {
    const newColors = filters.color.includes(color)
      ? filters.color.filter(c => c !== color)
      : [...filters.color, color];
    onChange({ ...filters, color: newColors });
  }, [filters, onChange]);

  const handleTypeChange = useCallback((type) => {
    const newTypes = filters.type.includes(type)
      ? filters.type.filter(t => t !== type)
      : [...filters.type, type];
    onChange({ ...filters, type: newTypes });
  }, [filters, onChange]);

  const handlePriceChange = useCallback((values) => {
    const [min, max] = values;
    if (min <= max) {
      setPriceRange(values);
      onChange({ ...filters, priceRange: values });
    }
  }, [filters, onChange]);

  const handleSaleChange = useCallback((e) => {
    onChange({ ...filters, onSale: e.target.checked });
  }, [filters, onChange]);

  const clearAllFilters = useCallback(() => {
    onChange({
      brand: [],
      color: [],
      type: [],
      priceRange: [0, 300],
      onSale: false
    });
    setPriceRange([0, 300]);
  }, [onChange]);

  return (
    <div className="bg-white text-black p-4 rounded-lg shadow sticky top-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-medium text-lg">Filters</h2>
        <button
          onClick={clearAllFilters}
          className="text-sm text-blue-600 hover:text-blue-800 focus:outline-none"
          aria-label="Clear all filters"
        >
          Clear all
        </button>
      </div>

      {/* Brand Filter */}
      <div className="text-black mb-6">
        <h3 className="font-medium mb-2">Brand</h3>
        <div className="space-y-2 max-h-60 overflow-y-auto">
          {brands.map((brand, index) => (
            <label key={`brand-${brand}-${index}`} className="flex items-center">

              <input
                type="checkbox"
                checked={filters.brand.includes(brand)}
                onChange={() => handleBrandChange(brand)}
                className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                aria-label={`Filter by ${brand} brand`}
              />
              <span className="ml-2 text-gray-700">{brand}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Color Filter */}
      <div className="text-black mb-6">
        <h3 className="font-medium mb-2">Color</h3>
        <div className="grid grid-cols-3 gap-2">
          {colors.map((color, index) => (
            <label key={`color-${color}-${index}`} className="flex items-center" title={color}>

              <input
                type="checkbox"
                checked={filters.color.includes(color)}
                onChange={() => handleColorChange(color)}
                className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                aria-label={`Filter by ${color} color`}
              />
              <span
                className="ml-1 w-4 h-4 rounded-full border border-gray-200 inline-block"
                style={{ backgroundColor: color.toLowerCase() }}
              />
            </label>
          ))}
        </div>
      </div>

      {/* Product Type Filter */}
      <div className="text-black mb-6">
        <h3 className="font-medium mb-2">Product Type</h3>
        <div className="space-y-2 max-h-60 overflow-y-auto">
          {productTypes.map((type, index) => (
            <label key={`type-${type}-${index}`} className="flex items-center">

              <input
                type="checkbox"
                checked={filters.type.includes(type)}
                onChange={() => handleTypeChange(type)}
                className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                aria-label={`Filter by ${type} type`}
              />
              <span className="ml-2 text-gray-700">{type}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range Filter */}
      <div className="text-black mb-6">
        <h3 className="font-medium mb-2 text-black">Price Range</h3>
        <div className="px-2">
          <div className="flex justify-between mb-2">
            <input
              type="number"
              min="0"
              max={priceRange[1]}
              value={priceRange[0]}
              onChange={(e) => handlePriceChange([Math.min(parseInt(e.target.value) || 0, priceRange[1]), priceRange[1]])}
              className="w-20 border rounded p-1 text-sm"
              aria-label="Minimum price"
            />
            <span className="mx-2 text-gray-500">to</span>
            <input
              type="number"
              min={priceRange[0]}
              max="300"
              value={priceRange[1]}
              onChange={(e) => handlePriceChange([priceRange[0], Math.max(parseInt(e.target.value) || 0, priceRange[0])])}
              className="w-20 border rounded p-1 text-sm"
              aria-label="Maximum price"
            />
          </div>
          <div className="relative h-2 bg-gray-200 rounded">
            <div
              className="absolute h-2 bg-blue-500 rounded"
              style={{
                left: `${(priceRange[0] / 300) * 100}%`,
                right: `${100 - (priceRange[1] / 300) * 100}%`,
              }}
            />
            <input
              type="range"
              min="0"
              max="300"
              value={priceRange[0]}
              onChange={(e) => handlePriceChange([parseInt(e.target.value), priceRange[1]])}
              className="absolute w-full h-2 opacity-0 cursor-pointer"
            />
            <input
              type="range"
              min="0"
              max="300"
              value={priceRange[1]}
              onChange={(e) => handlePriceChange([priceRange[0], parseInt(e.target.value)])}
              className="absolute w-full h-2 opacity-0 cursor-pointer"
            />
          </div>
          <div className="flex justify-between mt-2 text-sm text-gray-600">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </div>
      </div>

      {/* Sale Filter */}
      <div className="mb-6">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={filters.onSale}
            onChange={handleSaleChange}
            className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
            aria-label="Filter sale items"
          />
          <span className="ml-2 text-gray-700">On Sale</span>
        </label>
      </div>
    </div>
  );
}

FilterSidebar.propTypes = {
  brands: PropTypes.arrayOf(PropTypes.string).isRequired,
  colors: PropTypes.arrayOf(PropTypes.string).isRequired,
  productTypes: PropTypes.arrayOf(PropTypes.string).isRequired,
  filters: PropTypes.shape({
    brand: PropTypes.arrayOf(PropTypes.string),
    color: PropTypes.arrayOf(PropTypes.string),
    type: PropTypes.arrayOf(PropTypes.string),
    priceRange: PropTypes.arrayOf(PropTypes.number),
    onSale: PropTypes.bool
  }).isRequired,
  onChange: PropTypes.func.isRequired
};