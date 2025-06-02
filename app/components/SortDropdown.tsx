"use client";

import { useState } from 'react';
import PropTypes from 'prop-types';

export default function SortDropdown({ onChange }) {
  const [selected, setSelected] = useState('');

  const handleChange = (e) => {
    const value = e.target.value;
    setSelected(value);
    onChange(value);
  };

  return (
    <select
      value={selected}
      onChange={handleChange}
      className="border rounded px-3 py-1 text-sm"
    >
      <option value="">Select</option>
      <option value="price-asc">Price: Low to High</option>
      <option value="price-desc">Price: High to Low</option>
      <option value="newest">Newest Arrivals</option>
      <option value="rating">Top Rated</option>
    </select>
  );
}

SortDropdown.propTypes = {
  onChange: PropTypes.func.isRequired,
};
