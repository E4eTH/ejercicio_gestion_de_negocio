import React, { useState, useEffect } from 'react';
import { getPlates, getCategories, getConfig } from '../firebase/firestore';

const MenuPage = () => {
  const [plates, setPlates] = useState([]);
  const [categories, setCategories] = useState([]);
  const [config, setConfig] = useState({ name: 'La Terraza', subtitle: 'Cocina Mediterránea' });
  const [activeCategory, setActiveCategory] = useState('Todos');

  useEffect(() => {
    const unsubPlates = getPlates(setPlates);
    const unsubCats = getCategories((data) => {
      setCategories([{ id: 'all', name: 'Todos' }, ...data]);
    });
    const unsubConfig = getConfig((data) => {
      if (data) setConfig(data);
    });

    return () => {
      unsubPlates();
      unsubCats();
      unsubConfig();
    };
  }, []);

  const filtered = activeCategory === 'Todos'
    ? plates
    : plates.filter(p => p.category === activeCategory);

  return (
    <div className="flex flex-col items-center justify-start min-h-screen p-4 pt-16 sm:pt-32 w-full bg-[#1a1714] selection:bg-amber-100 selection:text-amber-900">

      {/* Decorative top element */}
      <div className="mb-8 sm:mb-12 opacity-60">
        <div className="w-px h-12 sm:h-16 bg-gradient-to-b from-transparent to-amber-700"></div>
      </div>

      {/* Hero */}
      <div className="text-center space-y-4 sm:space-y-6 animate-fade-in max-w-4xl px-4 sm:px-6">
        <h2 className="text-[10px] sm:text-xs md:text-sm uppercase tracking-[0.3em] sm:tracking-[0.5em] text-amber-800 font-bold opacity-80">
          {config.subtitle || 'Cocina Mediterránea'}
        </h2>

        <div className="relative">
          <h1 className="text-5xl sm:text-7xl md:text-9xl font-display italic text-[#fdfaf6] leading-tight sm:leading-none drop-shadow-sm">
            {config.name || 'La Terraza'}
          </h1>
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-32 sm:w-48 h-px bg-gradient-to-r from-transparent via-amber-700 to-transparent opacity-30"></div>
        </div>

        <p className="pt-6 sm:pt-8 text-stone-500/70 font-light tracking-widest text-[10px] sm:text-sm uppercase">
          {config.hours ? `Horario: ${config.hours}` : 'Est. 2026 — Mar y Tierra'}
          {config.address && <span className="block mt-1">{config.address}</span>}
        </p>
      </div>

      {/* Separador */}
      <div className="mt-16 sm:mt-24 mb-8 sm:mb-10 flex items-center gap-4 w-full max-w-3xl px-4 sm:px-6">
        <div className="flex-1 h-px bg-amber-800/40"></div>
        <span className="text-amber-500/60 text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] whitespace-nowrap">Nuestra carta</span>
        <div className="flex-1 h-px bg-amber-800/40"></div>
      </div>

      {/* Filtros de categoría */}
      <div className="flex flex-wrap justify-center gap-2 mb-8 sm:mb-10 px-4 sm:px-6">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.name)}
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

      {/* Grid de platos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 w-full max-w-5xl px-4 sm:px-6 pb-24 items-start">
        {filtered.length === 0 ? (
          <p className="col-span-full text-center text-stone-500 py-12 text-sm">No hay platos disponibles en esta categoría.</p>
        ) : (
          filtered.map(plate => (
            <div
              key={plate.id}
              className="bg-[#2a2420] rounded-2xl border border-amber-900/30 p-4 sm:p-5 flex flex-col gap-3 transition-all duration-300 hover:border-amber-800/40 group"
            >
              <div className={`flex flex-col gap-3 h-full ${!plate.available ? 'opacity-40' : ''}`}>
                {/* Imagen placeholder */}
                <div className="w-full h-32 sm:h-36 rounded-xl bg-[#1a1714] flex items-center justify-center border border-amber-900/20 overflow-hidden relative group">
                  {plate.imageUrl ? (
                    <img src={plate.imageUrl} alt={plate.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  ) : (
                    <span className="text-amber-900/40 text-3xl sm:text-4xl font-display italic group-hover:scale-110 transition-transform duration-500">
                      {plate.name ? plate.name[0] : '?'}
                    </span>
                  )}
                  {!plate.available && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <span className="text-[10px] uppercase tracking-[0.2em] text-amber-200 font-bold px-3 py-1 border border-amber-200/30 rounded-full bg-black/60">No disponible</span>
                    </div>
                  )}
                </div>

                <div className="flex justify-between items-start gap-2">
                  <h3 className="font-display italic text-[#fdfaf6] text-base sm:text-lg leading-tight">
                    {plate.name}
                  </h3>
                  <span className="text-amber-500 font-medium text-xs sm:text-sm whitespace-nowrap pt-1">
                    $ {plate.price?.toLocaleString('es-UY')}
                  </span>
                </div>

                <p className="text-stone-400 text-xs sm:text-sm leading-relaxed flex-1">
                  {plate.description}
                </p>

                {plate.available && (
                  <div className="h-px w-8 bg-amber-900/30 mt-auto"></div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
};

export default MenuPage;