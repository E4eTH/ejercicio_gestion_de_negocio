import React, { useState } from 'react';
import Input from '../ui/Input';
import Button from '../ui/Button';

const CategoryManager = ({ categories, onCreate, onDelete }) => {
  const [newCategory, setNewCategory] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newCategory.trim()) return;
    try {
      await onCreate(newCategory.trim());
      setNewCategory('');
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  return (
    <section className="space-y-6">
      <h2 className="font-display italic text-2xl text-amber-100">Categorías</h2>

      <form onSubmit={handleSubmit} className="flex gap-3">
        <Input 
          className="flex-1" 
          placeholder="Nueva categoría..."
          value={newCategory} 
          onChange={e => setNewCategory(e.target.value)} 
        />
        <Button type="submit">Añadir</Button>
      </form>

      <div className="flex flex-wrap gap-2">
        {categories.map(cat => (
          <div key={cat.id} className="flex items-center gap-2 px-4 py-2 rounded-full border border-amber-900/30 text-sm text-stone-300">
            {cat.name}
            <button onClick={() => onDelete(cat.id)}
              className="text-stone-600 hover:text-red-500 transition-colors text-xs ml-1">✕</button>
          </div>
        ))}
        {categories.length === 0 && <p className="text-stone-600 text-sm">No hay categorías aún.</p>}
      </div>
    </section>
  );
};

export default CategoryManager;
