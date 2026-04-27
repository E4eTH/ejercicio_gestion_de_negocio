import React, { useState } from 'react';

const categories = ['Todos', 'Entrantes', 'Principales', 'Postres', 'Bebidas'];

const plates = [
  { id: 1, name: 'Pan con tomate', category: 'Entrantes', price: 180, description: 'Pan artesano con tomate rallado y aceite de oliva virgen extra.', available: true },
  { id: 2, name: 'Croquetas caseras', category: 'Entrantes', price: 320, description: 'Bechamel cremosa con jamón ibérico. 6 unidades.', available: true },
  { id: 3, name: 'Gazpacho andaluz', category: 'Entrantes', price: 250, description: 'Tomate, pepino y pimiento. Servido frío con tropezones.', available: true },
  { id: 4, name: 'Dorada a la sal', category: 'Principales', price: 890, description: 'Dorada entera con patatas y ensalada verde.', available: true },
  { id: 5, name: 'Entrecot de ternera', category: 'Principales', price: 1100, description: 'Ternera gallega con pimientos asados y patatas fritas.', available: true },
  { id: 6, name: 'Paella mixta', category: 'Principales', price: 750, description: 'Arroz con mariscos y pollo. Mínimo 2 personas.', available: false },
  { id: 7, name: 'Crema catalana', category: 'Postres', price: 220, description: 'Receta tradicional con azúcar caramelizado en mesa.', available: true },
  { id: 8, name: 'Tarta de queso', category: 'Postres', price: 260, description: 'Estilo San Sebastián con mermelada de frutos rojos.', available: true },
  { id: 9, name: 'Vino tinto D.O.', category: 'Bebidas', price: 580, description: 'Rioja crianza. Copa o media botella disponible.', available: true },
  { id: 10, name: 'Agua mineral', category: 'Bebidas', price: 90, description: 'Botella 500 ml. Con o sin gas.', available: true },
];

const MenuPage = () => {
  const [activeCategory, setActiveCategory] = useState('Todos');

  const filtered = activeCategory === 'Todos'
    ? plates
    : plates.filter(p => p.category === activeCategory);

  return (
    <div className="flex flex-col items-center justify-start min-h-screen p-4 pt-32 w-full bg-[#1a1714] selection:bg-amber-100 selection:text-amber-900">

      {/* Decorative top element */}
      <div className="mb-12 opacity-60">
        <div className="w-px h-16 bg-gradient-to-b from-transparent to-amber-700"></div>
      </div>

      {/* Hero */}
      <div className="text-center space-y-6 animate-fade-in max-w-4xl px-6">
        <h2 className="text-xs md:text-sm uppercase tracking-[0.5em] text-amber-800 font-bold opacity-80">
          Cocina Mediterránea
        </h2>

        <div className="relative">
          <h1 className="text-7xl md:text-9xl font-display italic text-[#fdfaf6] leading-none drop-shadow-sm">
            La Terraza
          </h1>
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-48 h-px bg-gradient-to-r from-transparent via-amber-700 to-transparent opacity-30"></div>
        </div>

        <p className="pt-8 text-stone-500/70 font-light tracking-widest text-sm uppercase">
          Est. 2026 — Mar y Tierra
        </p>
      </div>

      {/* Separador */}
      <div className="mt-24 mb-10 flex items-center gap-4 w-full max-w-3xl px-6">
        <div className="flex-1 h-px bg-amber-800/40"></div>
        <span className="text-amber-500/60 text-xs uppercase tracking-[0.3em]">Nuestra carta</span>
        <div className="flex-1 h-px bg-amber-800/40"></div>
      </div>

      {/* Filtros de categoría */}
      <div className="flex flex-wrap justify-center gap-2 mb-10 px-6">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-5 py-2 rounded-full text-xs uppercase tracking-widest transition-all duration-200 border
              ${activeCategory === cat
                ? 'bg-amber-800 text-amber-50 border-amber-800'
                : 'bg-transparent text-stone-400 border-stone-700 hover:border-amber-600 hover:text-amber-500'
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid de platos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl px-6 pb-24 items-start">
        {filtered.map(plate => (
          <div
            key={plate.id}
            className="bg-[#2a2420] rounded-2xl border border-amber-900/30 p-5 flex flex-col gap-3 transition-all duration-300 hover:border-amber-800/40"
          >
            <div className={`flex flex-col gap-3 h-full ${!plate.available ? 'opacity-40' : ''}`}>
              {/* Imagen placeholder */}
              <div className="w-full h-36 rounded-xl bg-[#1a1714] flex items-center justify-center border border-amber-900/20">
                <span className="text-amber-900/40 text-4xl font-display italic">
                  {plate.name[0]}
                </span>
              </div>

              <div className="flex justify-between items-start gap-2">
                <h3 className="font-display italic text-[#fdfaf6] text-lg leading-tight">
                  {plate.name}
                </h3>
                <span className="text-amber-500 font-medium text-sm whitespace-nowrap pt-1">
                  $ {plate.price.toLocaleString('es-UY')}
                </span>
              </div>

              <p className="text-stone-400 text-sm leading-relaxed flex-1">
                {plate.description}
              </p>

              {!plate.available && (
                <span className="mt-auto self-start text-xs uppercase tracking-widest px-3 py-1 rounded-full border border-amber-800/50 text-amber-700 bg-amber-900/20">
                  No disponible hoy
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default MenuPage;