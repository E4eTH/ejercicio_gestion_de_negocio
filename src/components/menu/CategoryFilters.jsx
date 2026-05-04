import React from 'react';

const CategoryFilters = ({ categories, activeCategory, onCategoryChange }) => {
  return (
    <div className="flex flex-wrap justify-center gap-2 mb-8 sm:mb-10 px-4 sm:px-6">
      {categories.map(cat => (
        <button
          key={cat.id}
          onClick={() => onCategoryChange(cat.name)}
          className={`px-4 sm:px-5 py-1.5 sm:py-2 rounded-full text-[10px] sm:text-xs uppercase tracking-widest transition-all duration-200 border
            ${activeCategory === cat.name
              ? 'bg-amber-800 text-amber-50 border-amber-800'
              : 'bg-transparent text-stone-400 border-stone-700 hover:border-amber-600 hover:text-amber-500'
            }`}
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilters;
