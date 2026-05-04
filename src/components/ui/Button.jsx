import React from 'react';

const Button = ({ children, onClick, type = 'button', variant = 'primary', className = '', disabled = false }) => {
  const baseStyles = "px-4 py-2 rounded-xl text-xs uppercase tracking-widest transition-colors duration-200 text-center flex-1 sm:flex-none";
  
  const variants = {
    primary: "bg-amber-800 hover:bg-amber-700 text-amber-50 disabled:opacity-50",
    secondary: "border border-amber-900/40 text-stone-400 hover:text-amber-500 hover:border-amber-700",
    danger: "border border-red-900/40 text-stone-400 hover:text-red-500 hover:border-red-700",
    outline: "border border-amber-900/30 text-stone-400 hover:border-amber-600 hover:text-amber-500"
  };

  return (
    <button 
      type={type} 
      onClick={onClick} 
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
