import React, { useState, useEffect } from 'react';
import Input from '../ui/Input';
import Button from '../ui/Button';

const EMPTY_PLATE = { name: '', description: '', price: '', category: '', available: true, imageUrl: '' };

const PlateForm = ({ categories, onSave, editingPlate, onCancel }) => {
  const [form, setForm] = useState(EMPTY_PLATE);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editingPlate) {
      setForm({ ...editingPlate, price: String(editingPlate.price) });
      setImagePreview(editingPlate.imageUrl || '');
      setImageFile(null);
    } else {
      setForm(EMPTY_PLATE);
      setImagePreview('');
      setImageFile(null);
    }
  }, [editingPlate]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSave(form, imageFile);
      if (!editingPlate) {
        setForm(EMPTY_PLATE);
        setImagePreview('');
        setImageFile(null);
      }
    } catch (err) {
      alert("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="space-y-6">
      <h2 className="font-display italic text-2xl text-amber-100">
        {editingPlate ? 'Editando plato' : 'Añadir plato'}
      </h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input 
          label="Nombre" 
          placeholder="Ej: Dorada a la sal" 
          required 
          value={form.name} 
          onChange={e => setForm({ ...form, name: e.target.value })} 
        />
        
        <div>
          <label className="text-xs uppercase tracking-widest text-stone-400 mb-1 block">Categoría</label>
          <select 
            className="w-full bg-[#1a1714] border border-amber-900/30 rounded-xl px-4 py-2.5 text-sm text-[#fdfaf6] focus:outline-none focus:border-amber-700 transition-colors" 
            required
            value={form.category} 
            onChange={e => setForm({ ...form, category: e.target.value })}
          >
            <option value="">Seleccionar...</option>
            {categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label className="text-xs uppercase tracking-widest text-stone-400 mb-1 block">Descripción</label>
          <textarea 
            className="w-full bg-[#1a1714] border border-amber-900/30 rounded-xl px-4 py-2.5 text-sm text-[#fdfaf6] placeholder:text-stone-600 focus:outline-none focus:border-amber-700 transition-colors resize-none" 
            rows={2} 
            placeholder="Descripción breve del plato..."
            value={form.description} 
            onChange={e => setForm({ ...form, description: e.target.value })} 
          />
        </div>

        <div className="sm:col-span-2">
          <label className="text-xs uppercase tracking-widest text-stone-400 mb-1 block">Foto del plato</label>
          <div className="flex gap-4 items-start">
            <div className="w-28 h-28 rounded-xl bg-[#1a1714] border border-amber-900/30 flex items-center justify-center overflow-hidden flex-shrink-0">
              {imagePreview
                ? <img src={imagePreview} alt="preview" className="w-full h-full object-cover" />
                : <span className="text-stone-700 text-xs text-center px-2">Sin imagen</span>
              }
            </div>
            <div className="flex-1 flex flex-col gap-2">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="text-sm text-stone-400 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:uppercase file:tracking-widest file:bg-amber-800 file:text-amber-50 hover:file:bg-amber-700 file:cursor-pointer file:transition-colors"
              />
              <p className="text-xs text-stone-600">JPG, PNG o WebP. Se sube al guardar.</p>
            </div>
          </div>
        </div>

        <Input 
          label="Precio ($ UY)" 
          type="number" 
          placeholder="0" 
          required 
          min="0"
          value={form.price} 
          onChange={e => setForm({ ...form, price: e.target.value })} 
        />

        <div className="flex items-end gap-3">
          <Button type="submit" disabled={loading} className="flex-1">
            {loading ? 'Subiendo...' : editingPlate ? 'Guardar cambios' : 'Añadir plato'}
          </Button>
          {editingPlate && (
            <Button variant="secondary" onClick={onCancel}>
              Cancelar
            </Button>
          )}
        </div>
      </form>
    </section>
  );
};

export default PlateForm;
