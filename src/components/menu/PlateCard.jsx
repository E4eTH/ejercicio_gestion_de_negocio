import React from 'react';

const PlateCard = ({ plate }) => {
  return (
    <div className="bg-[#2a2420] rounded-2xl border border-amber-900/30 p-4 sm:p-5 flex flex-col gap-3 transition-all duration-300 hover:border-amber-800/40 group">
      <div className={`flex flex-col gap-3 h-full ${!plate.available ? 'opacity-40' : ''}`}>
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
  );
};

export default PlateCard;
