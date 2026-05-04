import React, { useState } from 'react';
import { usePlates } from '../hooks/usePlates';
import { useCategories } from '../hooks/useCategories';
import { useConfig } from '../hooks/useConfig';
import MenuHero from '../components/menu/MenuHero';
import CategoryFilters from '../components/menu/CategoryFilters';
import PlateCard from '../components/menu/PlateCard';

const MenuPage = () => {
  const { plates, loading: platesLoading } = usePlates();
  const { categories, loading: catsLoading } = useCategories(true); // true to include 'Todos'
  const { config } = useConfig();
  const [activeCategory, setActiveCategory] = useState('Todos');

  const filteredPlates = activeCategory === 'Todos'
    ? plates
    : plates.filter(p => p.category === activeCategory);

  const isLoading = platesLoading || catsLoading;

  return (
    <div className="flex flex-col items-center justify-start min-h-screen p-4 pt-16 sm:pt-32 w-full bg-[#1a1714] selection:bg-amber-100 selection:text-amber-900">
      
      {/* Decorative top element */}
      <div className="mb-8 sm:mb-12 opacity-60">
        <div className="w-px h-12 sm:h-16 bg-gradient-to-b from-transparent to-amber-700"></div>
      </div>

      {/* Hero Section */}
      <MenuHero config={config} />

      {/* Separator */}
      <div className="mt-16 sm:mt-24 mb-8 sm:mb-10 flex items-center gap-4 w-full max-w-3xl px-4 sm:px-6">
        <div className="flex-1 h-px bg-amber-800/40"></div>
        <span className="text-amber-500/60 text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] whitespace-nowrap">Nuestra carta</span>
        <div className="flex-1 h-px bg-amber-800/40"></div>
      </div>

      {/* Filters */}
      <CategoryFilters 
        categories={categories} 
        activeCategory={activeCategory} 
        onCategoryChange={setActiveCategory} 
      />

      {/* Plates Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 w-full max-w-5xl px-4 sm:px-6 pb-24 items-start">
        {isLoading ? (
          <p className="col-span-full text-center text-stone-500 py-12 text-sm">Cargando nuestra carta...</p>
        ) : filteredPlates.length === 0 ? (
          <p className="col-span-full text-center text-stone-500 py-12 text-sm">No hay platos disponibles en esta categoría.</p>
        ) : (
          filteredPlates.map(plate => (
            <PlateCard key={plate.id} plate={plate} />
          ))
        )}
      </div>

    </div>
  );
};

export default MenuPage;