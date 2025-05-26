'use client';

import { useState } from 'react';

interface FilterSectionProps {
  filters: Record<string, string[]>;
  setFilters: React.Dispatch<React.SetStateAction<Record<string, string[]>>>;
}

const FilterSection = ({ filters, setFilters }: FilterSectionProps) => {
  const filterGroups = [
    { title: 'Color', options: ['Black', 'White', 'Red', 'Blue'] },
    { title: 'Gender', options: ['Men', 'Women', 'Kids'] },
    { title: 'Category', options: ['Running', 'Casual', 'Sports'] },
    { title: 'Price', options: ['Under $50', '$50-$100', '$100-$150', 'Over $150'] },
  ];

  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>(
    filterGroups.reduce((acc, group) => ({ ...acc, [group.title]: false }), {})
  );

  const toggleGroup = (title: string) => {
    setExpandedGroups(prev => ({ ...prev, [title]: !prev[title] }));
  };

  const toggleFilter = (group: string, option: string) => {
    setFilters(prev => {
      const newFilters = { ...prev };

      if (!newFilters[group]) newFilters[group] = [];

      if (newFilters[group].includes(option)) {
        newFilters[group] = newFilters[group].filter(item => item !== option);
        if (newFilters[group].length === 0) delete newFilters[group];
      } else {
        newFilters[group].push(option);
      }

      return newFilters;
    });
  };

  return (
    <div className="space-y-4">
      {/* Special filters section */}
      <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
        <h2 className="font-bold text-lg mb-3">Show</h2>
        <div className="space-y-2">
          {['New Color', 'Best Seller'].map(option => (
            <label key={option} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters['Show']?.includes(option) || false}
                onChange={() => toggleFilter('Show', option)}
                className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
              />
              <span className="text-gray-700">{option}</span>
            </label>
          ))}
        </div>
      </div>

      <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
        Store all filters
      </button>

      {/* Filter groups */}
      <div className="divide-y divide-gray-200">
        {filterGroups.map(group => (
          <div key={group.title} className="py-4">
            <button
              onClick={() => toggleGroup(group.title)}
              className="flex justify-between items-center w-full text-left"
              aria-expanded={expandedGroups[group.title]}
            >
              <h3 className="font-semibold text-gray-900">{group.title}</h3>
              <span className="text-gray-500">
                {expandedGroups[group.title] ? '−' : '+'}
              </span>
            </button>

            {expandedGroups[group.title] && (
              <div className="mt-3 space-y-2 pl-1">
                {group.options.map(option => (
                  <label key={option} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters[group.title]?.includes(option) || false}
                      onChange={() => toggleFilter(group.title, option)}
                      className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                    />
                    <span className="text-gray-700">{option}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterSection;
