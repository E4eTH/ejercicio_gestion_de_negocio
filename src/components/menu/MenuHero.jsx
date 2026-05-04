import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const MenuHero = ({ config }) => {
  const [clickCount, setClickCount] = useState(0);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (clickCount === 0) return;
    const timer = setTimeout(() => {
      setClickCount(0);
    }, 3000);
    return () => clearTimeout(timer);
  }, [clickCount]);

  const handleTitleClick = () => {
    setClickCount(prev => {
      const newCount = prev + 1;
      if (newCount >= 5) {
        if (user) {
          navigate('/admin');
        } else {
          navigate('/login');
        }
        return 0;
      }
      return newCount;
    });
  };

  return (
    <div className="text-center space-y-4 sm:space-y-6 animate-fade-in max-w-4xl px-4 sm:px-6">
      <h2 className="text-[10px] sm:text-xs md:text-sm uppercase tracking-[0.3em] sm:tracking-[0.5em] text-amber-800 font-bold opacity-80">
        {config.subtitle || 'Cocina Mediterránea'}
      </h2>

      <div className="relative">
        <h1 
          onClick={handleTitleClick}
          className="text-5xl sm:text-7xl md:text-9xl font-display italic text-[#fdfaf6] leading-tight sm:leading-none drop-shadow-sm cursor-default select-none"
        >
          {config.name || 'La Terraza'}
        </h1>
        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-32 sm:w-48 h-px bg-gradient-to-r from-transparent via-amber-700 to-transparent opacity-30"></div>
      </div>

      <p className="pt-6 sm:pt-8 text-stone-500/70 font-light tracking-widest text-[10px] sm:text-sm uppercase">
        {config.hours ? `Horario: ${config.hours}` : 'Est. 2026 — Mar y Tierra'}
        {config.address && <span className="block mt-1">{config.address}</span>}
      </p>
    </div>
  );
};

export default MenuHero;
