import React from 'react';

const Input = ({ label, placeholder, value, onChange, type = 'text', required = false, className = '', ...props }) => {
  const labelStyles = "text-xs uppercase tracking-widest text-stone-400 mb-1 block";
  const inputStyles = "w-full bg-[#1a1714] border border-amber-900/30 rounded-xl px-4 py-2.5 text-sm text-[#fdfaf6] placeholder:text-stone-600 focus:outline-none focus:border-amber-700 transition-colors";

  return (
    <div className={className}>
      {label && <label className={labelStyles}>{label}</label>}
      <input
        type={type}
        className={inputStyles}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        {...props}
      />
    </div>
  );
};

export default Input;
