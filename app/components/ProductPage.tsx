'use client';

import { useState } from 'react';
import FilterPage from './FilterPage';

export default function ProductPage() {
  const [filters, setFilters] = useState<Record<string, string[]>>({});

  return (
    <div className="flex">
      <div className="w-64 p-4">
        <FilterPage filters={filters} setFilters={setFilters} />
      </div>
      <div className="flex-1 p-4">
        {/* Product grid */}
      </div>
    </div>
  );
}